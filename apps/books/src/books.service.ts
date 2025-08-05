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
    if (!createBookDto.authorId) {
      throw new Error('Author ID is required');
    }

    const book = await this.prisma.book.create({
      data: createBookDto as Required<CreateBookDto>,
    });
    return book;
  }

  async findAll(): Promise<BookDto[]> {
    return this.prisma.book.findMany({
      include: {
        author: true,
      },
    });
  }

  async findAllMyBooks(userId: number): Promise<BookDto[]> {
    return this.prisma.book.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

  async findOne(id: number): Promise<BookDto | null> {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDto | null> {
    try {
      const { id: _, ...updateData } = updateBookDto;
      return await this.prisma.book.update({
        where: { id },
        data: updateData,
        include: {
          author: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<BookDto | null> {
    try {
      return await this.prisma.book.delete({
        where: { id },
        include: {
          author: true,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
