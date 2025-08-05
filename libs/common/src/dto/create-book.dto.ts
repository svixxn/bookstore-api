import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(1, { message: 'Title must not be empty' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title: string;

  @IsOptional()
  @IsNumber({}, { message: 'Author ID must be a number' })
  authorId?: number;

  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;
}
