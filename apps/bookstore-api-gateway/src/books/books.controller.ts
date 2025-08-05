import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  CreateBookDto,
  UpdateBookDto,
  JwtAuthGuard,
  CurrentUser,
} from '@app/common';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @CurrentUser() user: any) {
    const bookWithAuthor = { ...createBookDto, authorId: user.userId };
    return this.booksService.create(bookWithAuthor);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('my-books')
  findAllMyBooks(@CurrentUser() user: any) {
    return this.booksService.findAllMyBooks(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
