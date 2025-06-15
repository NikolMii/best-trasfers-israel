# Stage 1: Build the Vite app
FROM node:20 AS builder

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY frontend/ ./
RUN pnpm build

# Stage 2: NGINX with runtime config templating
FROM nginx:stable-alpine

# Install envsubst (part of gettext)
RUN apk add --no-cache gettext

# Default ENV (can be overridden at runtime)
ENV BACKEND_URL=backend:3001

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy template nginx config
COPY frontend/nginx.template.conf /etc/nginx/nginx.conf

# Entry point: substitute env vars into config and run NGINX
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
