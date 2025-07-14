import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOKS_CLIENT') private usersClient: ClientProxy) {}

  create(createBookDto: CreateBookDto) {
    return this.usersClient.send('books.create', createBookDto);
  }

  findAll() {
    return this.usersClient.send('books.findAll', {});
  }

  findOne(id: number) {
    return this.usersClient.send('books.findOne', id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.usersClient.send('books.update', { id, ...updateBookDto });
  }

  remove(id: number) {
    return this.usersClient.send('books.remove', id);
  }
}
