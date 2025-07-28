import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from '@app/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.BOOKS_SERVICE_HOST || 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, JwtStrategy],
})
export class BooksModule {}
