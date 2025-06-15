# Stage 1: Build the backend
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN corepack enable && pnpm install

# Copy the rest of the code
COPY backend/ ./

# Build TypeScript (optional if you want a JS dist)
# RUN pnpm build

# Run with ts-node
CMD ["pnpm", "start"]
