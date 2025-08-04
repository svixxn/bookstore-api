import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(1, { message: 'Title must not be empty' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  @IsNotEmpty({ message: 'Author is required' })
  @MinLength(1, { message: 'Author must not be empty' })
  @MaxLength(100, { message: 'Author must not exceed 100 characters' })
  author: string;

  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;
}
