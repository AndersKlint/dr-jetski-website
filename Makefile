.PHONY: check deploy-prod

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
