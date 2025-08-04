import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BooksModule } from './books.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.BOOKS_SERVICE_HOST || 'localhost',
        port: 3002,
      },
    },
  );

  // Enable global validation for microservice
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  await app.listen();
}

bootstrap();
