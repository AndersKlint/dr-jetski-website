# Wrap-around feature-overlay ribbon

Overruled: the final ribbon looked good, but the owner preferred the original flat label with its orange left rule. The implementation below preserves the final two-color version for possible restoration.

![Ribbon reference](wrap_around_ribbon.png)

The ribbon appeared only when the label's rendered left edge extended past the visible image's left edge. An SVG behind the text panel curved down into a recessed underside ending at the image edge, with a thin ember rim. It used exactly two flat fills: primary `--ember` and that color mixed with 28% black. The shadow was applied behind the combined panel/ribbon to avoid muddying the orange. Authored positions, layout space, dark/light text panels, and navigation remained intact.

Geometry was measured in local CSS pixels to account for transformed carousel layers and scaled screenshot exports. A `ResizeObserver` watched the media and label; hidden layers were measured when shown. Browser overlays and the screenshot generator shared the same renderer. No content-model or YAML changes were required.

## Restoration code

### 1. Create `src/media/updateFeatureOverlayRibbon.ts`

```ts
export function updateFeatureOverlayRibbon(overlay: HTMLElement): void {
  const media = overlay.parentElement!;
  const banner = overlay.querySelector<HTMLElement>('.feature-overlay-banner')!;
  const mediaBounds = media.getBoundingClientRect();
  const bannerBounds = banner.getBoundingClientRect();
  if (mediaBounds.width === 0 || bannerBounds.width === 0) return;

  const scale = mediaBounds.width / Number.parseFloat(getComputedStyle(media).width);
  const overhang = (mediaBounds.left - bannerBounds.left) / scale;
  let ribbon = banner.querySelector<SVGSVGElement>('.feature-overlay-ribbon');

  if (overhang <= 0) {
    ribbon?.remove();
    delete banner.dataset.hasRibbon;
    banner.style.removeProperty('--ribbon-panel-inset');
    return;
  }

  if (!ribbon) {
    ribbon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ribbon.classList.add('feature-overlay-ribbon');
    ribbon.setAttribute('aria-hidden', 'true');
    ribbon.setAttribute('focusable', 'false');
    ribbon.innerHTML = '<path class="ribbon-front"/><path class="ribbon-back"/>';
    banner.prepend(ribbon);
  }

  const height = Number.parseFloat(getComputedStyle(banner).height);
  const radius = Math.min(18, overhang * 0.8, height / 3);
  const depth = Math.min(16, overhang * 0.65, height * 0.2);
  const foldLeft = Math.min(6, overhang * 0.22);
  const rim = Math.min(1.5, overhang * 0.08, depth * 0.18);
  const panelInset = Math.max(0, Math.min(18, overhang * 0.65) - 8);
  banner.style.setProperty('--ribbon-panel-inset', `${panelInset}px`);
  ribbon.setAttribute('width', String(overhang));
  ribbon.setAttribute('height', String(height + depth));
  ribbon.setAttribute('viewBox', `0 0 ${overhang} ${height + depth}`);
  ribbon.querySelector('.ribbon-front')!.setAttribute('d',
    `M ${overhang} 0 C ${overhang * 0.25} 0 0 0 0 ${radius}
     L 0 ${height - radius}
     C 0 ${height + depth * 0.45} ${overhang * 0.3} ${height + depth * 0.85} ${overhang} ${height + depth}
     Z`);
  ribbon.querySelector('.ribbon-back')!.setAttribute('d',
    `M ${overhang} ${height + rim} L ${overhang} ${height + depth - rim}
     C ${overhang * 0.5} ${height + depth - rim} ${foldLeft} ${height + depth * 0.6} ${foldLeft} ${height + depth * 0.3}
     C ${foldLeft} ${height + rim} ${overhang * 0.5} ${height + rim} ${overhang} ${height + rim} Z`);
  banner.dataset.hasRibbon = 'true';
}
```

### 2. Create `src/media/featureOverlay.client.ts`

```ts
import { updateFeatureOverlayRibbon } from './updateFeatureOverlayRibbon';

let disposePrevious: (() => void) | undefined;

export function initFeatureOverlays(doc: Document = document): void {
  disposePrevious?.();
  const overlays = [...doc.querySelectorAll<HTMLElement>('[data-feature-overlay]')];
  const overlaysByTarget = new Map<Element, HTMLElement>();
  const observer = new ResizeObserver((entries) => {
    const changedOverlays = new Set(entries.map(({ target }) => overlaysByTarget.get(target)!));
    for (const overlay of changedOverlays) updateFeatureOverlayRibbon(overlay);
  });

  for (const overlay of overlays) {
    const media = overlay.parentElement!;
    const banner = overlay.querySelector<HTMLElement>('.feature-overlay-banner')!;
    for (const target of [media, banner]) {
      overlaysByTarget.set(target, overlay);
      observer.observe(target);
    }
    updateFeatureOverlayRibbon(overlay);
  }

  const onPageHide = (event: PageTransitionEvent) => {
    if (!event.persisted) dispose();
  };
  const dispose = () => {
    observer.disconnect();
    doc.removeEventListener('astro:before-swap', dispose);
    window.removeEventListener('pagehide', onPageHide);
    disposePrevious = undefined;
  };
  doc.addEventListener('astro:before-swap', dispose);
  window.addEventListener('pagehide', onPageHide);
  disposePrevious = dispose;
}
```

### 3. Append to `src/media/FeatureOverlay.astro`

```astro
<script>
  import { initFeatureOverlays } from './featureOverlay.client';
  initFeatureOverlays();
</script>
```

### 4. Change `src/media/featureOverlay.css`

Apply this diff to the flat design. Keep the existing placement, typography, border width, and other styles.

```diff
 .feature-overlay-banner {
+  --feature-overlay-background: linear-gradient(135deg, #303437 0%, #202325 100%);
+  position: relative;
+  isolation: isolate;
   box-sizing: border-box;
@@
-  background: linear-gradient(135deg, #303437 0%, #202325 100%);
+  background: var(--feature-overlay-background);
@@
 .feature-overlay[data-style="light"] .feature-overlay-banner {
-  background: linear-gradient(135deg, #f0f1f2 0%, #d9dde0 100%);
+  --feature-overlay-background: linear-gradient(135deg, #f0f1f2 0%, #d9dde0 100%);
   color: #202325;
 }
```

Append:

```css
.feature-overlay-banner[data-has-ribbon] {
  background: none;
  border-left-color: transparent;
  box-shadow: none;
  filter: drop-shadow(0 8px 14px rgb(0 0 0 / 0.5));
}

.feature-overlay-banner[data-has-ribbon]::after {
  content: "";
  position: absolute;
  inset: 0 0 0 var(--ribbon-panel-inset);
  z-index: -1;
  border-radius: inherit;
  background: var(--feature-overlay-background);
}

.feature-overlay-ribbon {
  position: absolute;
  top: 0;
  left: -8px;
  z-index: -2;
  display: block;
  max-width: none;
  overflow: visible;
}

.ribbon-front {
  fill: var(--ember);
}

.ribbon-back {
  fill: color-mix(in srgb, var(--ember), black 28%);
}
```

### 5. Integrate `store-screenshot-generator/store-screenshot-generator`

Add this import:

```js
import { updateFeatureOverlayRibbon } from '../src/media/updateFeatureOverlayRibbon.ts';
```

After font loading and the final composition scaling, immediately before `const outputPath = ...`, add:

```js
if (image.overlay) {
  await page.locator('.feature-overlay').evaluate(updateFeatureOverlayRibbon);
}
```

The generator already loads `featureOverlay.css` and creates the same overlay markup, so no other generator changes are needed. Its `--highlight-color` override replaces `--ember`, including the darker underside derived from it. The renderer must remain self-contained because Playwright serializes it into the browser.

## Verification when restoring

The final implementation passed `make check` (39 files, zero diagnostics; 13 generated pages) and `git diff --check`. Four HanScan exports were generated and `slope.png` was visually inspected; the last temporary output was `/tmp/opencode/ribbon-two-tone/` and may not persist. Manually review desktop/mobile, cropped homepage previews, selected carousel items, labels moved inside the image, keyboard/media behavior, and scaled exports with a custom highlight color.
