import { Injectable } from '@nestjs/common';
import {
  CreateBookDto,
  UpdateBookDto,
  BookDto,
  PrismaService,
} from '@app/common';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    const book = await this.prisma.book.create({
      data: createBookDto,
    });
    return book;
  }

  async findAll(): Promise<BookDto[]> {
    return this.prisma.book.findMany();
  }

  async findOne(id: number): Promise<BookDto | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDto | null> {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<BookDto | null> {
    try {
      return await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
