import {
  PreviewPlaybackService,
  type PreviewPlaybackEnvironment,
} from './PreviewPlaybackService';

const PREVIEW_SELECTOR = '[data-auto-preview]';
const VIDEO_SELECTOR = '[data-preview-video]';
const CONTROL_SELECTOR = '[data-motion-control]';

interface PreviewNode {
  id: string;
  root: HTMLElement;
  video: HTMLVideoElement;
}

declare global {
  interface Window {
    __drJetskiPreviewPlayback?: { dispose: () => void };
  }
}

type SaveDataConnection = EventTarget & { saveData?: boolean };

function readConnection(): SaveDataConnection | null {
  const connection = (window.navigator as Navigator & { connection?: SaveDataConnection })
    .connection;
  return connection ?? null;
}

function readEnvironment(): PreviewPlaybackEnvironment {
  return {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    savesData: readConnection()?.saveData === true,
  };
}

function collectPreviews(doc: Document): PreviewNode[] {
  return [...doc.querySelectorAll(PREVIEW_SELECTOR)]
    .map((root, index): PreviewNode | null => {
      if (!(root instanceof HTMLElement)) return null;
      const video = root.querySelector(VIDEO_SELECTOR);
      if (!(video instanceof HTMLVideoElement)) return null;
      const id = root.dataset.previewId ?? `auto-preview-${index}`;
      root.dataset.previewId = id;
      return { id, root, video };
    })
    .filter((entry): entry is PreviewNode => entry !== null);
}

function updateControl(control: HTMLElement, isPaused: boolean): void {
  control.textContent = isPaused ? 'Play motion' : 'Pause motion';
  control.setAttribute('aria-pressed', String(isPaused));
}

function isAbortError(error: unknown): boolean {
  return (
    error instanceof DOMException && error.name === 'AbortError' ||
    (typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError')
  );
}

export function initPreviewPlayback(doc: Document = document): () => void {
  const active = window.__drJetskiPreviewPlayback;
  if (active) return active.dispose;

  const previews = collectPreviews(doc);
  const controls = [...doc.querySelectorAll(CONTROL_SELECTOR)].filter(
    (control): control is HTMLElement => control instanceof HTMLElement,
  );
  const byId = new Map(previews.map((preview) => [preview.id, preview]));

  const service = new PreviewPlaybackService(readEnvironment(), {
    loadPreview: (id) => {
      const preview = byId.get(id);
      if (!preview || preview.video.dataset.loaded === 'true') return;
      const source = preview.video.dataset.src;
      if (!source) return;
      preview.video.dataset.loaded = 'true';
      preview.video.src = source;
      preview.video.load();
    },
    playPreview: (id) => {
      const preview = byId.get(id);
      if (!preview) return;
      void preview.video
        .play()
        .then(() => {
          const current = byId.get(id);
          if (!current || !service.isPlaying(id) || current.video.paused) {
            current?.video.pause();
            if (current) delete current.root.dataset.playing;
            return;
          }
          current.root.dataset.playing = 'true';
        })
        .catch((error: unknown) => {
          const current = byId.get(id);
          if (!current) return;
          delete current.root.dataset.playing;
          if (isAbortError(error)) return;
          current.root.dataset.failed = 'true';
          service.markUnavailable(id);
        });
    },
    pausePreview: (id) => {
      const preview = byId.get(id);
      if (!preview) return;
      preview.video.pause();
      delete preview.root.dataset.playing;
    },
  });

  const detachments: Array<() => void> = [];
  for (const preview of previews) {
    service.registerPreview(preview.id);
    const onError = () => {
      preview.root.dataset.failed = 'true';
      delete preview.root.dataset.playing;
      service.markUnavailable(preview.id);
    };
    const onPlaying = () => {
      if (service.isPlaying(preview.id)) preview.root.dataset.playing = 'true';
    };
    preview.video.addEventListener('error', onError);
    preview.video.addEventListener('playing', onPlaying);
    detachments.push(() => {
      preview.video.removeEventListener('error', onError);
      preview.video.removeEventListener('playing', onPlaying);
    });
  }
  service.setPageHidden(doc.visibilityState === 'hidden');

  const canObserve = typeof IntersectionObserver !== 'undefined' && previews.length > 0;
  let nearObserver: IntersectionObserver | null = null;
  let visibleObserver: IntersectionObserver | null = null;
  if (canObserve) {
    nearObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const root = entry.target as HTMLElement;
          if (root.dataset.previewId) service.setNearViewport(root.dataset.previewId, entry.isIntersecting);
        }
      },
      { rootMargin: '400px 0px' },
    );
    visibleObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const root = entry.target as HTMLElement;
          if (root.dataset.previewId) service.setVisible(root.dataset.previewId, entry.isIntersecting);
        }
      },
      { threshold: 0.25 },
    );
    for (const preview of previews) {
      nearObserver.observe(preview.root);
      visibleObserver.observe(preview.root);
    }
  }

  const onVisibilityChange = () => {
    service.setPageHidden(doc.visibilityState === 'hidden');
  };
  doc.addEventListener('visibilitychange', onVisibilityChange);

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionPreference = () => {
    service.setEnvironment(readEnvironment());
    refreshControls();
  };
  mediaQuery.addEventListener('change', onMotionPreference);

  const connection = readConnection();
  const onConnectionChange = () => {
    service.setEnvironment(readEnvironment());
    refreshControls();
  };
  if (connection && typeof connection.addEventListener === 'function') {
    connection.addEventListener('change', onConnectionChange);
  }

  const refreshControls = () => {
    const canAutoPlay = canObserve && (service.canAutoPlay() || service.hasUserPaused());
    for (const control of controls) {
      if (!canAutoPlay) {
        control.hidden = true;
        continue;
      }
      control.hidden = false;
      updateControl(control, service.hasUserPaused());
    }
  };
  const onControlClick = () => {
    service.setUserPaused(!service.hasUserPaused());
  };
  for (const control of controls) {
    control.addEventListener('click', onControlClick);
  }
  const unsubscribe = service.subscribeUserPaused(() => refreshControls());
  refreshControls();

  const dispose = () => {
    nearObserver?.disconnect();
    visibleObserver?.disconnect();
    doc.removeEventListener('visibilitychange', onVisibilityChange);
    mediaQuery.removeEventListener('change', onMotionPreference);
    if (connection && typeof connection.removeEventListener === 'function') {
      connection.removeEventListener('change', onConnectionChange);
    }
    for (const control of controls) control.removeEventListener('click', onControlClick);
    for (const detach of detachments) detach();
    unsubscribe();
    for (const preview of previews) service.unregisterPreview(preview.id);
    if (window.__drJetskiPreviewPlayback?.dispose === dispose) {
      delete window.__drJetskiPreviewPlayback;
    }
  };
  window.__drJetskiPreviewPlayback = { dispose };
  return dispose;
}
