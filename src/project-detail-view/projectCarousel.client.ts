import { initPreviewPlayback, type PreviewPlaybackHandle } from '../media/previewPlayback.client';
import { ProjectCarouselService } from './ProjectCarouselService';

const CAROUSEL_SELECTOR = '[data-media-carousel]';
const STAGE_SELECTOR = '[data-carousel-stage]';
const LAYER_SELECTOR = '[data-carousel-layer]';
const ITEM_SELECTOR = '[data-carousel-item]';
const DOT_SELECTOR = '[data-carousel-dot]';
const SIZER_SELECTOR = '[data-carousel-sizer]';
const STATUS_SELECTOR = '[data-carousel-status]';
const MEDIA_SELECTOR = '[data-stack-media]';
const MANAGED_PREVIEW_SELECTOR = '[data-preview-managed="true"]';
const PHONE_MEDIA_QUERY = '(max-width: 40rem)';
const NEAR_VIEWPORT_MARGIN = '400px 0px';
const VISIBLE_THRESHOLD = 0.25;
const SWIPE_THRESHOLD = 42;
const SWIPE_CLICK_GUARD = 400;
const EDGE_MARGIN = 6;

interface SelectionOptions {
  shouldRestart: boolean;
  shouldFocusSelected?: boolean;
}

interface TouchStart {
  x: number;
  y: number;
}

function readSlideTarget(element: HTMLElement): number | null {
  const raw = element.dataset.slideTarget;
  if (raw === undefined) return null;
  const index = Number.parseInt(raw, 10);
  return Number.isInteger(index) ? index : null;
}

function restartPreview(layer: HTMLElement): void {
  const video = layer.querySelector<HTMLVideoElement>('video[data-preview-video]');
  if (!video || video.readyState < HTMLMediaElement.HAVE_METADATA) return;
  video.currentTime = 0;
}

function pauseVideosIn(layer: HTMLElement): void {
  for (const video of layer.querySelectorAll('video')) {
    if (!video.paused) video.pause();
  }
}

function isInteractiveMediaTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest('video, input, select, textarea, [contenteditable="true"]') !== null
  );
}

function createCarousel(root: HTMLElement, playback: PreviewPlaybackHandle): () => void {
  const stage = root.querySelector<HTMLElement>(STAGE_SELECTOR);
  const layers = [...root.querySelectorAll<HTMLElement>(LAYER_SELECTOR)];
  if (!stage || layers.length < 2) return () => {};

  const sizer = root.querySelector<HTMLElement>(SIZER_SELECTOR);
  const dots = [...root.querySelectorAll<HTMLElement>(DOT_SELECTOR)];
  const status = root.querySelector<HTMLElement>(STATUS_SELECTOR);
  const service = new ProjectCarouselService(layers.length);
  const phoneQuery = window.matchMedia(PHONE_MEDIA_QUERY);
  const detachments: Array<() => void> = [];

  let lastStageWidth = stage.clientWidth;
  let isNearViewport = false;
  let isVisible = false;
  let touchStart: TouchStart | null = null;
  let suppressClickUntil = 0;

  const listen = (
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ): void => {
    target.addEventListener(type, listener, options);
    detachments.push(() => target.removeEventListener(type, listener, options));
  };

  const selectedLayer = (): HTMLElement | undefined => layers[service.currentIndex];

  const controlFor = (layer: HTMLElement): HTMLButtonElement | null =>
    layer.querySelector<HTMLButtonElement>(ITEM_SELECTOR);

  const previewIdFor = (layer: HTMLElement): string | null => {
    const preview = layer.querySelector<HTMLElement>(MANAGED_PREVIEW_SELECTOR);
    return preview?.dataset.previewId ?? null;
  };

  const applyPlaybackState = (): void => {
    layers.forEach((layer, index) => {
      const previewId = previewIdFor(layer);
      if (previewId) {
        const isActive = index === service.currentIndex && isNearViewport;
        playback.setPreviewVisible(previewId, isActive && isVisible);
        playback.setPreviewNearViewport(previewId, isActive);
      }
      if (index !== service.currentIndex) pauseVideosIn(layer);
    });
  };

  const updateMetrics = (isImmediate = false): void => {
    const current = selectedLayer();
    if (!current) return;
    const selectedRatio = Number(current.dataset.mediaRatio);
    const selectedWidth = Number.parseFloat(getComputedStyle(current).width);
    if (!Number.isFinite(selectedRatio) || selectedRatio <= 0 || selectedWidth <= 0) return;
    const selectedHeight = selectedWidth / selectedRatio;

    if (isImmediate) root.dataset.instant = '';
    if (sizer) {
      sizer.style.width = `${selectedWidth}px`;
      sizer.style.height = `${selectedHeight}px`;
    }

    const stageRect = stage.getBoundingClientRect();
    const stageCenterX = stageRect.left + stageRect.width / 2;
    const viewportHalf = Math.min(stageCenterX, window.innerWidth - stageCenterX);

    layers.forEach((layer, index) => {
      const indexOffset = index - service.currentIndex;
      if (indexOffset === 0) {
        layer.style.setProperty('--layer-scale', '1');
        layer.style.setProperty('--layer-x', '0px');
        return;
      }
      const baseWidth = Number.parseFloat(getComputedStyle(layer).width);
      if (!Number.isFinite(baseWidth) || baseWidth <= 0) return;
      const depth = Math.min(Math.abs(indexOffset), 2);
      const isLeft = indexOffset < 0;
      const mediaRatio = Number(layer.dataset.mediaRatio);
      const widthBySelected = selectedWidth * (depth === 1 ? 0.72 : 0.56);
      const widthByHeight =
        Number.isFinite(mediaRatio) && mediaRatio > 0
          ? selectedHeight * (depth === 1 ? 0.82 : 0.68) * mediaRatio
          : widthBySelected;
      const width = Math.min(widthBySelected, widthByHeight);
      const requestedOffset = selectedWidth * (depth === 1 ? 0.42 : 0.82);
      const maximumOffset = Math.max(viewportHalf - width / 2 - EDGE_MARGIN, 0);
      const offset = (isLeft ? -1 : 1) * Math.min(requestedOffset, maximumOffset);
      layer.style.setProperty('--layer-scale', String(width / baseWidth));
      layer.style.setProperty('--layer-x', `${offset}px`);
    });

    if (isImmediate) {
      void stage.offsetWidth;
      requestAnimationFrame(() => {
        delete root.dataset.instant;
      });
    }
  };

  const updateLayout = (isImmediate = false): void => {
    const visibleSlots = service.getVisibleSlots(phoneQuery.matches ? 1 : 2);
    const slotByIndex = new Map(visibleSlots.map((slot) => [slot.index, slot]));
    layers.forEach((layer, index) => {
      const slot = slotByIndex.get(index);
      const isSelected = index === service.currentIndex;
      layer.dataset.visible = slot ? 'true' : 'false';
      if (slot) layer.dataset.slot = slot.name;
      else delete layer.dataset.slot;
      layer.toggleAttribute('data-selected', isSelected);
      if (slot) layer.removeAttribute('aria-hidden');
      else layer.setAttribute('aria-hidden', 'true');

      const media = layer.querySelector<HTMLElement>(MEDIA_SELECTOR);
      if (media) media.toggleAttribute('inert', !isSelected);

      const control = controlFor(layer);
      if (control) {
        control.tabIndex = slot && !isSelected ? 0 : -1;
        if (isSelected) control.setAttribute('aria-current', 'true');
        else control.removeAttribute('aria-current');
      }
    });
    updateMetrics(isImmediate);
  };

  const updateIndicators = (): void => {
    if (status) {
      status.textContent = `Image ${service.currentIndex + 1} of ${layers.length}`;
    }
    for (const dot of dots) {
      if (readSlideTarget(dot) === service.currentIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    }
  };

  const focusSelected = (): void => {
    controlFor(selectedLayer() as HTMLElement)?.focus({ preventScroll: true });
  };

  const updateSelection = (index: number, options: SelectionOptions, isInitial = false): void => {
    const previousIndex = service.currentIndex;
    const selected = service.select(index);
    if (selected === previousIndex && !isInitial) return;
    updateLayout();
    updateIndicators();
    if (options.shouldRestart) {
      const layer = layers[selected];
      if (layer) restartPreview(layer);
    }
    applyPlaybackState();
    if (options.shouldFocusSelected) focusSelected();
  };

  const navigate = (index: number, options: SelectionOptions): void => {
    updateSelection(index, options);
  };

  const onControlClick: EventListener = (event) => {
    if (performance.now() < suppressClickUntil) {
      event.preventDefault();
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) return;
    const control =
      target.closest<HTMLElement>(ITEM_SELECTOR) ?? target.closest<HTMLElement>(DOT_SELECTOR);
    if (!control || !root.contains(control)) return;
    const index = readSlideTarget(control);
    if (index === null) return;
    event.preventDefault();
    if (index === service.currentIndex) return;
    navigate(index, { shouldRestart: true });
  };

  const onKeyDown: EventListener = (event) => {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.defaultPrevented || keyEvent.altKey || keyEvent.ctrlKey || keyEvent.metaKey) return;
    if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') return;
    if (isInteractiveMediaTarget(keyEvent.target)) return;
    keyEvent.preventDefault();
    navigate(service.currentIndex + (keyEvent.key === 'ArrowRight' ? 1 : -1), {
      shouldRestart: true,
      shouldFocusSelected: true,
    });
  };

  const onTouchStart: EventListener = (event) => {
    if (isInteractiveMediaTarget(event.target)) {
      touchStart = null;
      return;
    }
    const touchEvent = event as TouchEvent;
    const touch = touchEvent.touches[0];
    touchStart = touchEvent.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd: EventListener = (event) => {
    const start = touchStart;
    touchStart = null;
    const touch = (event as TouchEvent).changedTouches[0];
    if (!start || !touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    suppressClickUntil = performance.now() + SWIPE_CLICK_GUARD;
    navigate(service.currentIndex + (deltaX < 0 ? 1 : -1), { shouldRestart: true });
  };

  const onTouchCancel: EventListener = () => {
    touchStart = null;
  };

  listen(root, 'click', onControlClick);
  listen(root, 'keydown', onKeyDown);
  listen(stage, 'touchstart', onTouchStart, { passive: true });
  listen(stage, 'touchend', onTouchEnd, { passive: true });
  listen(stage, 'touchcancel', onTouchCancel, { passive: true });

  let nearObserver: IntersectionObserver | null = null;
  let visibleObserver: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== 'undefined') {
    nearObserver = new IntersectionObserver(
      ([entry]) => {
        const nextNear = entry?.isIntersecting ?? false;
        if (nextNear === isNearViewport) return;
        isNearViewport = nextNear;
        if (!isNearViewport) isVisible = false;
        applyPlaybackState();
      },
      { rootMargin: NEAR_VIEWPORT_MARGIN },
    );
    visibleObserver = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry?.isIntersecting ?? false;
        if (nextVisible === isVisible) return;
        isVisible = nextVisible;
        if (isVisible) isNearViewport = true;
        applyPlaybackState();
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    nearObserver.observe(stage);
    visibleObserver.observe(stage);
  }

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      if (stage.clientWidth === lastStageWidth) return;
      lastStageWidth = stage.clientWidth;
      updateMetrics(true);
    });
    resizeObserver.observe(stage);
  }

  const onViewportResize = (): void => {
    lastStageWidth = stage.clientWidth;
    updateMetrics(true);
  };
  listen(window, 'resize', onViewportResize);
  if (window.visualViewport) listen(window.visualViewport, 'resize', onViewportResize);

  const onPhoneQueryChange = (): void => {
    lastStageWidth = stage.clientWidth;
    updateLayout(true);
  };
  phoneQuery.addEventListener('change', onPhoneQueryChange);

  updateSelection(0, { shouldRestart: false }, true);

  return () => {
    nearObserver?.disconnect();
    visibleObserver?.disconnect();
    resizeObserver?.disconnect();
    phoneQuery.removeEventListener('change', onPhoneQueryChange);
    for (const detach of detachments) detach();
    layers.forEach((layer) => {
      const previewId = previewIdFor(layer);
      if (previewId) {
        playback.setPreviewVisible(previewId, false);
        playback.setPreviewNearViewport(previewId, false);
      }
      pauseVideosIn(layer);
    });
  };
}

const initializedCarousels = new WeakSet<HTMLElement>();
const carouselDisposers = new WeakMap<HTMLElement, () => void>();

export function initProjectCarousel(doc: Document = document): () => void {
  const playback = initPreviewPlayback(doc);
  const roots = [...doc.querySelectorAll<HTMLElement>(CAROUSEL_SELECTOR)];
  for (const root of roots) {
    if (initializedCarousels.has(root)) continue;
    initializedCarousels.add(root);
    carouselDisposers.set(root, createCarousel(root, playback));
  }
  return () => {
    for (const root of roots) {
      const dispose = carouselDisposers.get(root);
      if (!dispose) continue;
      dispose();
      carouselDisposers.delete(root);
      initializedCarousels.delete(root);
    }
  };
}
