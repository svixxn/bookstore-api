import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from '@app/common';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('books.create')
  create(
    @Payload() payload: { createBookDto: CreateBookDto; authorId: number },
  ) {
    return this.booksService.create(payload.createBookDto, payload.authorId);
  }

  @MessagePattern('books.findAll')
  findAll() {
    return this.booksService.findAll();
  }

  @MessagePattern('books.findAllMyBooks')
  findAllMyBooks(@Payload() userId: number) {
    return this.booksService.findAllMyBooks(userId);
  }

  @MessagePattern('books.findOne')
  findOne(@Payload() id: number) {
    return this.booksService.findOne(id);
  }

  // fix ts
  @MessagePattern('books.update')
  update(@Payload() payload: { id: number; updateBookDto: UpdateBookDto }) {
    return this.booksService.update(payload.id, payload.updateBookDto);
  }

  @MessagePattern('books.remove')
  remove(@Payload() id: number) {
    return this.booksService.remove(id);
  }
}
