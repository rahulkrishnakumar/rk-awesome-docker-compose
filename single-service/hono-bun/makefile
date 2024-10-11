# Development -------------------------------------------------------

.PHONY: build-development
build-development: ## Build the development docker image.
	cd app;\
	rm -rf node_modules;\
	bun install;\
	cd ..;
	docker compose -f docker-compose.dev.yml --progress plain build --no-cache

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker-compose.dev.yml up -d

.PHONY: stop-development
stop-development: ## Start the development docker container.
	docker compose -f docker-compose.dev.yml down

# Production -------------------------------------------------------

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker-compose.prod.yml --progress plain build --no-cache

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker-compose.prod.yml up -d

.PHONY: stop-production
stop-production: ## Start the production docker container.
	docker compose -f docker-compose.prod.yml down
