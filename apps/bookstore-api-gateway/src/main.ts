import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BookstoreApiGatewayModule } from './bookstore-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(BookstoreApiGatewayModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      disableErrorMessages: false, // Set to true in production for security
      validationError: {
        target: false, // Don't return the class instance in error responses
        value: false, // Don't return the rejected value in error responses
      },
    }),
  );

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
