import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    { id: 1, title: '1984', author: 'George Orwell', rating: 5 },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      rating: 4.5,
    },
  ];

  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      id: this.books.length + 1,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book) => book.id === id) || null;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });
    return this.books.find((book) => book.id === id);
  }

  remove(id: number) {
    const filteredBooks = this.books.filter((book) => book.id !== id);
    this.books = filteredBooks;
    return filteredBooks;
  }
}
