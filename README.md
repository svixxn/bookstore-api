# Bookstore API - NestJS Microservices

A scalable bookstore API built with NestJS microservices architecture, featuring PostgreSQL with Prisma ORM, Redis for caching, and Docker for containerization.

## 🏗️ Architecture

This application follows a microservices architecture with:

- **API Gateway**: Main entry point that routes requests to appropriate microservices
- **Books Service**: Handles all book-related operations
- **Users Service**: Manages user data and operations
- **PostgreSQL Database**: Shared database with Prisma ORM
- **Redis**: Caching and inter-service communication

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### Book Model

```prisma
model Book {
  id     Int    @id @default(autoincrement())
  title  String
  author String
  rating Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("books")
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd bookstore
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
# Update DATABASE_URL and other environment variables
```

4. **Start with Docker (Recommended)**

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up
```

### Manual Setup (without Docker)

1. **Start PostgreSQL and Redis**

```bash
# Using Docker for services only
docker-compose -f docker-compose.dev.yml up db redis -d
```

2. **Database setup**

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

3. **Start services**

```bash
# Start all services in development
npm run start:dev:bookstore-api-gateway
npm run start:dev:users
npm run start:dev:books

# Or start individually
npm run start:dev           # API Gateway
npm run start:dev:users     # Users Service
npm run start:dev:books     # Books Service
```

## 📚 API Documentation

### Books API

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/books`     | Get all books   |
| GET    | `/books/:id` | Get book by ID  |
| POST   | `/books`     | Create new book |
| PATCH  | `/books/:id` | Update book     |
| DELETE | `/books/:id` | Delete book     |

**Create Book Example:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "rating": 4.2
}
```

### Users API

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/users`              | Get all users     |
| GET    | `/users/:id`          | Get user by ID    |
| GET    | `/users/email/:email` | Get user by email |
| POST   | `/users`              | Create new user   |
| PATCH  | `/users/:id`          | Update user       |
| DELETE | `/users/:id`          | Delete user       |

**Create User Example:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

## 🛠️ Development

### Available Scripts

```bash
# Build
npm run build                           # Build all services
npm run build:bookstore-api-gateway     # Build API Gateway
npm run build:users                     # Build Users service
npm run build:books                     # Build Books service

# Development
npm run start:dev                       # Start API Gateway in watch mode
npm run start:dev:users                 # Start Users service in watch mode
npm run start:dev:books                 # Start Books service in watch mode

# Database
npm run db:generate                     # Generate Prisma client
npm run db:migrate                      # Run database migrations
npm run db:push                         # Push schema changes to database
npm run db:studio                       # Open Prisma Studio (database GUI)
npm run db:seed                         # Seed database with initial data

# Code Quality
npm run lint                            # Run ESLint
npm run format                          # Format code with Prettier
npm run test                            # Run unit tests
npm run test:e2e                        # Run end-to-end tests
npm run test:cov                        # Run tests with coverage
```

### Project Structure

```
bookstore/
├── apps/
│   ├── bookstore-api-gateway/          # API Gateway service
│   ├── books/                          # Books microservice
│   └── users/                          # Users microservice
├── libs/
│   └── common/                         # Shared libraries and utilities
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                         # Database seeding script
├── generated/
│   └── prisma/                         # Generated Prisma client
├── docker-compose.yml                  # Production Docker setup
├── docker-compose.dev.yml              # Development Docker setup
└── package.json
```

### Database Management

#### Creating Migrations

```bash
# After modifying prisma/schema.prisma
npm run db:migrate
```

#### Checking Migration Status

```bash
npx prisma migrate status
```

#### Reset Database (Development)

```bash
npx prisma migrate reset
```

### Adding New Features

1. **Update Prisma Schema** (`prisma/schema.prisma`)
2. **Generate Migration** (`npm run db:migrate`)
3. **Update DTOs** in `libs/common/src/dto/`
4. **Update Services** to use new schema
5. **Update Controllers** if needed
6. **Test** your changes

## 🐳 Docker Configuration

### Development

- Hot reloading enabled
- Database exposed on port 5432
- Redis exposed on port 6379
- API Gateway on port 3000

### Production

- Optimized builds
- No development dependencies
- Internal networking only

### Ports

- **API Gateway**: 3000
- **Users Service**: 3001 (dev only)
- **Books Service**: 3002 (dev only)
- **PostgreSQL**: 5432 (dev only)
- **Redis**: 6379 (dev only)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📊 Monitoring & Debugging

### Prisma Studio

```bash
npm run db:studio
```

Access the database GUI at `http://localhost:5555`

### Redis CLI

```bash
docker-compose exec redis redis-cli
```

### Database Logs

```bash
docker-compose logs db
```

## 🚀 Deployment

### Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `USERS_SERVICE_HOST`: Users service hostname
- `BOOKS_SERVICE_HOST`: Books service hostname

### Production Deployment

1. **Set environment variables**
2. **Run database migrations**

```bash
npm run db:migrate
```

3. **Build and start services**

```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Open an issue on GitHub
- Check the [NestJS Documentation](https://docs.nestjs.com)
- Visit [Prisma Documentation](https://www.prisma.io/docs)
