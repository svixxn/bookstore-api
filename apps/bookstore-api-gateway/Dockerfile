# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json tsconfig*.json ./
COPY prisma ./prisma
COPY apps ./apps
COPY libs ./libs

RUN npm install
RUN npx prisma generate
RUN npm run build bookstore-api-gateway

# Stage 2: Run
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist/apps/bookstore-api-gateway ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

# Run database migrations and start the application
CMD ["npm", "run", "migrate:start:prod:bookstore-api-gateway"]
