import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    { id: 1, name: 'John Doe', email: 'johndoe1@gmail.com' },
    { id: 2, name: 'Jane Doe', email: 'janedoe1@gmail.com' },
  ];

  findAll(): UserDto[] {
    return this.users;
  }
}
