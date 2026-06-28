# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source
COPY . .

# Build TypeScript → dist
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/dist ./dist


# Expose your port
EXPOSE 3000

# Run compiled JS
CMD ["node", "dist/index.js"]