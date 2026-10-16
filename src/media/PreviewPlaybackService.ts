export interface PreviewPlaybackEnvironment {
  prefersReducedMotion: boolean;
  savesData: boolean;
}

export interface PreviewPlaybackEffects {
  loadPreview(id: string): void;
  playPreview(id: string): void;
  pausePreview(id: string): void;
}

export const MAX_SIMULTANEOUS_PREVIEWS = 3;

interface PreviewEntry {
  isNearViewport: boolean;
  isVisible: boolean;
}

type PauseListener = (isPaused: boolean) => void;

export class PreviewPlaybackService {
  private previews = new Map<string, PreviewEntry>();
  private loadedIds = new Set<string>();
  private playingIds = new Set<string>();
  private unavailableIds = new Set<string>();
  private isUserPaused = false;
  private isPageHidden = false;
  private listeners = new Set<PauseListener>();

  constructor(
    private environment: PreviewPlaybackEnvironment,
    private effects: PreviewPlaybackEffects,
    private maxSimultaneous: number = MAX_SIMULTANEOUS_PREVIEWS,
  ) {}

  registerPreview(id: string): void {
    if (this.unavailableIds.has(id) || this.previews.has(id)) return;
    this.previews.set(id, { isNearViewport: false, isVisible: false });
  }

  markUnavailable(id: string): void {
    this.unavailableIds.add(id);
    this.previews.delete(id);
    this.loadedIds.delete(id);
    if (this.playingIds.delete(id)) {
      this.effects.pausePreview(id);
    }
    this.recompute();
  }

  isPlaying(id: string): boolean {
    return this.playingIds.has(id);
  }

  unregisterPreview(id: string): void {
    this.previews.delete(id);
    this.loadedIds.delete(id);
    if (this.playingIds.delete(id)) {
      this.effects.pausePreview(id);
    }
  }

  setEnvironment(environment: PreviewPlaybackEnvironment): void {
    this.environment = environment;
    this.recompute();
  }

  setUserPaused(isPaused: boolean): void {
    if (this.isUserPaused === isPaused) return;
    this.isUserPaused = isPaused;
    this.recompute();
    for (const listener of this.listeners) listener(this.isUserPaused);
  }

  hasUserPaused(): boolean {
    return this.isUserPaused;
  }

  subscribeUserPaused(listener: PauseListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  setNearViewport(id: string, isNearViewport: boolean): void {
    const entry = this.previews.get(id);
    if (!entry || entry.isNearViewport === isNearViewport) return;
    entry.isNearViewport = isNearViewport;
    if (!isNearViewport) {
      entry.isVisible = false;
    }
    this.recompute();
  }

  setVisible(id: string, isVisible: boolean): void {
    const entry = this.previews.get(id);
    if (!entry || entry.isVisible === isVisible) return;
    entry.isVisible = isVisible;
    if (isVisible) entry.isNearViewport = true;
    this.recompute();
  }

  setPageHidden(isHidden: boolean): void {
    if (this.isPageHidden === isHidden) return;
    this.isPageHidden = isHidden;
    this.recompute();
  }

  canAutoPlay(): boolean {
    return (
      !this.environment.prefersReducedMotion &&
      !this.environment.savesData &&
      !this.isUserPaused &&
      !this.isPageHidden
    );
  }

  private recompute(): void {
    if (!this.canAutoPlay()) {
      for (const id of this.playingIds) this.effects.pausePreview(id);
      this.playingIds.clear();
      return;
    }
    for (const [id, entry] of this.previews) {
      if (entry.isNearViewport && !this.loadedIds.has(id)) {
        this.loadedIds.add(id);
        this.effects.loadPreview(id);
      }
    }
    const candidates = [...this.previews.entries()]
      .filter(([, entry]) => entry.isVisible)
      .slice(0, this.maxSimultaneous)
      .map(([id]) => id);
    const wanted = new Set(candidates);
    for (const id of this.playingIds) {
      if (!wanted.has(id)) {
        this.playingIds.delete(id);
        this.effects.pausePreview(id);
      }
    }
    for (const id of candidates) {
      if (!this.playingIds.has(id)) {
        this.playingIds.add(id);
        this.effects.playPreview(id);
      }
    }
  }
}
