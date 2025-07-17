# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./
COPY apps ./apps

RUN npm install
RUN npm run build users

# Stage 2: Run
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist/apps/users ./dist

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
