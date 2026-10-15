# AGENTS.md

Dr. Jetski Studios is a project catalogue and software-download site. Build with Astro, TypeScript, and static output on Cloudflare Pages; distribute binaries and substantial preview media through Cloudflare R2. Prioritize useful project presentation, fast loading, and inexpensive operation.

## Project documents

- Before implementing features or changing layouts, read [DESIGN.md](DESIGN.md) for the confirmed experience, visual direction, project inventory, and availability rules.
- Before starting an implementation milestone or changing scope, read [PLAN.md](PLAN.md) for sequencing and completion criteria. Use the organization rules below for source layout.
- Before naming project concepts or changing the content model, read [GLOSSARY.md](GLOSSARY.md) and use its terminology. Keep implementation details out of the glossary.
- Consult [INITIAL_BRAINSTORM.md](INITIAL_BRAINSTORM.md) for historical context; the confirmed design supersedes earlier suggestions.
- When an agreed decision changes, update its authoritative document instead of copying the decision into multiple files.

## Flat domain organization

Organize by feature/domain, keeping each area one or two folders deep under `src/`. Co-locate its UI, services, types, adapters, styles, and relevant tests. Use a second level for a cohesive subfeature, not a technical layer.

Target organization, creating files and folders as their responsibilities are implemented:

```text
src/
  pages/index.astro
  pages/projects/[slug].astro
  pages/404.astro
  content.config.ts
  content/projects/*.md
  projects/Project.ts
  projects/projectSchema.ts
  projects/ProjectCatalogService.ts
  projects/astroProjectSource.ts
  home-view/HomeView.astro
  home-view/project-showcase/ProjectShowcase.astro
  home-view/ProjectCard.astro
  home-view/CompactProjectGrid.astro
  project-detail-view/ProjectDetailView.astro
  project-detail-view/ProjectGallery.astro
  project-detail-view/ProjectDownloads.astro
  media/MediaPreview.astro
  media/PreviewPlaybackService.ts
  media/previewPlayback.client.ts
  banner/StudioIdentity.astro
  about/AboutContact.astro
  site/SiteLayout.astro
  site/global.css
public/
  fonts/
  images/
```

- Keep `src/pages/` as thin routing/composition entry points. Keep framework entry points such as `src/content.config.ts` where Astro requires them; place their substantive implementation in the owning domain.
- Put catalogue selection, featured ordering, visibility, and availability rules in `projects/`. Views consume prepared results rather than duplicating those rules.
- Keep layout-specific presentation inside `home-view/` or `project-detail-view/`. Put genuinely shared media behavior in `media/`, studio identity in `banner/`, and the document shell/design tokens in `site/`.
- Extend an existing domain when the responsibility fits. Keep cross-domain imports on an intentional public interface and exchange values or explicit method calls rather than reaching into another domain's state.
- Keep UI and its logic together by ownership rather than introducing global `components/`, `services/`, `stores/`, or `utils/` buckets. Share code once it has a real cross-feature responsibility.

## Presentation, services, and dependency injection

- Keep UI presentational: accept prepared props, render markup/styles, and delegate user intent through thin event bindings. Business rules and application state belong in domain services.
- Use ordinary TypeScript functions, factories, or classes for services. Prefer pure functions for stateless calculations and service-owned state when behavior is stateful. Use composition over inheritance.
- Inject dependencies explicitly through constructor, factory, or function parameters. Wire concrete dependencies in route/build composition or browser initialization, rather than having presentation code locate or construct them.
- Use small interfaces where external effects or interchangeable dependencies need a seam. Add an interface or service when it hides meaningful behavior, not as a mandatory wrapper around every function.
- Keep domain rules independent of Astro, the DOM, and content-storage APIs. Adapters translate Astro content and browser events into plain typed values and invoke domain behavior.
- The playback service owns playback eligibility, the simultaneous-preview limit, and the user's pause state; browser bindings own DOM wiring and media effects.
- Plain explicit injection is the default. Add a DI container or reactive UI runtime only when a concrete requirement warrants its cost.

## Astro execution and state lifetime

- Astro frontmatter executes at build time for this static site. Use it to compose build-time services and pass prepared values to `.astro` views; it does not provide reactive browser state.
- Initialize interactive services separately in browser-side TypeScript through processed Astro scripts. Transfer only the required serializable configuration through markup; service instances do not cross the build/browser seam.
- Keep browser imports free of `astro:content`, filesystem access, and other build-only dependencies. Access browser globals and create observers/listeners only during explicit browser initialization.
- Own mutable browser state per page or mounted feature. Share one playback service across the previews in a document so the cap is page-wide. Keep mutable interaction state out of build-time module singletons.
- The code creating listeners, observers, subscriptions, or timers owns their teardown. Keep initialization and disposal together and make repeated mounting safe.
- Astro deduplicates processed component scripts: initialize every rendered instance explicitly, rather than assuming a script runs once for each component instance.
- Preserve usable static content and ordinary navigation; ship JavaScript for the interactions that need it.

## Code conventions

- Use strict TypeScript and descriptive names. Use `PascalCase` for types, service classes, and `.astro` components; `camelCase` for functions, variables, and other TypeScript files; `kebab-case` for domain folders. Browser entry files use `.client.ts`.
- Prefix boolean names with `is`, `has`, `should`, or `can`. Name domain concepts specifically instead of relying on generic helpers or managers.
- Validate authored content at its ingestion seam and surface invalid content as a build failure. Handle expected browser limitations and media-playback failures where they occur; avoid silently hiding programming errors or adding guards for impossible states.
- Use self-documenting code. Comments may only be single-line explanations of non-obvious reasons, technical workarounds, or edge cases. Do not add docstrings, code summaries, or comments that narrate what the code does.
- Store real project information in content files, with release maturity, public availability, and visibility kept distinct. Use clearly temporary media during layout work and render actionable links only for actual destinations.

## Verification

- Use the package manager indicated by the lockfile and the commands in `package.json` once the project is initialized. Keep build/check commands discoverable there.
- After code changes, run the relevant content/type checks and production build. For layout or media changes, also verify the affected desktop/mobile views and keyboard/media behavior against `PLAN.md`.
- Add focused behavior tests when domain decisions, state transitions, or regressions justify them. Exercise service interfaces with explicit dependencies; keep pure logic headless-testable. Presentation-only edits can be verified in the browser.
