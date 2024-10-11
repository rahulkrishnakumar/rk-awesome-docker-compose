# Base -------------------------------------------
FROM oven/bun:1 AS base
LABEL maintainer="Rahul Krishnakumar"

# Dependencies for developent environment --------
FROM base AS dep_dev
WORKDIR /app
COPY bun.lockb package.json ./
RUN \
      if [ -f bun.lockb ]; then bun install --frozen-lockfile; \
      else echo "Lockfile not found." && exit 1;\
      fi

# Dependencies for production environment --------
FROM base AS dep_prod
WORKDIR /app
COPY bun.lockb package.json ./
RUN \
      if [ -f bun.lockb ]; then bun install --frozen-lockfile --production; \
      else echo "Lockfile not found." && exit 1;\
      fi

# Build for production --------------------------
FROM base AS builder
WORKDIR /app
COPY --from=dep_dev /app/node_modules ./node_modules
COPY . ./
RUN bun run build

# Development -----------------------------------
FROM base AS dev
WORKDIR /app

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 hono

COPY --chown=hono:bunjs . ./
COPY --from=dep_dev --chown=hono:bunjs /app/node_modules ./node_modules

USER hono

EXPOSE 4001
ENV NODE_ENV development
CMD bun run dev

# Production  ---------------------------------
FROM base AS prod
WORKDIR /app

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 hono

COPY --from=dep_prod --chown=hono:bunjs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:bunjs /app/dist /app/dist
COPY --from=builder --chown=hono:bunjs /app/package.json /app/package.json

USER hono
EXPOSE 4002

ENV NODE_ENV production
CMD bun run start
