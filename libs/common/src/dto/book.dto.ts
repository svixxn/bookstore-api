import { UserDto } from './user.dto';

export class BookDto {
  id: number;
  title: string;
  rating: number;
  authorId: number;
  author?: UserDto;
  createdAt: Date;
  updatedAt: Date;
}
