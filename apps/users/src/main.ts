import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_SERVICE_HOST || 'localhost',
        port: 3001,
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
