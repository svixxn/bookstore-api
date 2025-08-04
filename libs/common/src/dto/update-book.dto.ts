import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsNumber({}, { message: 'ID must be a number' })
  id?: number;
}
