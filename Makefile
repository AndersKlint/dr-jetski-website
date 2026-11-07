.PHONY: check deploy-prod upload

check:
	ASTRO_TELEMETRY_DISABLED=1 npm run check
	ASTRO_TELEMETRY_DISABLED=1 npm run build

deploy-prod: check
	git fetch origin
	git switch release
	git pull --ff-only origin release
	git merge --ff-only origin/main
	git push origin release
	git switch main

upload: export PROJECT := $(PROJECT)
upload: export DRY_RUN := $(DRY_RUN)
upload:
	@if [ -z "$$PROJECT" ]; then \
		echo 'Usage: make upload PROJECT=<slug> [DRY_RUN=1]' >&2; exit 1; \
	fi; \
	case "$$DRY_RUN" in \
		''|0) set -- ;; \
		1) set -- --dry-run ;; \
		*) echo 'DRY_RUN must be empty, 0, or 1.' >&2; exit 1 ;; \
	esac; \
	npm run releases:upload -- --project "$$PROJECT" "$$@"
