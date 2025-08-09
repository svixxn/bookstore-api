import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOKS_CLIENT') private booksClient: ClientProxy) {}

  create(createBookDto: CreateBookDto, authorId: number) {
    return this.booksClient.send('books.create', { createBookDto, authorId });
  }

  findAll() {
    return this.booksClient.send('books.findAll', {});
  }

  findAllMyBooks(userId: number) {
    return this.booksClient.send('books.findAllMyBooks', userId);
  }

  findOne(id: number) {
    return this.booksClient.send('books.findOne', id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send('books.update', { id, updateBookDto });
  }

  remove(id: number) {
    return this.booksClient.send('books.remove', id);
  }
}
