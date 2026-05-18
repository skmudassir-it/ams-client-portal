# ─────────────────────────────────────────────
# AMS Client Portal — Development Dockerfile
# ─────────────────────────────────────────────

FROM node:20-alpine

WORKDIR /app

# Install dependencies for native modules (prisma, sharp, etc.)
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy application source
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
