import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return this.usersClient.send('users.create', createUserDto);
  }

  findAll() {
    return this.usersClient.send('users.findAll', {});
  }

  findOne(id: number) {
    return this.usersClient.send('users.findOne', id);
  }

  findByEmail(email: string) {
    return this.usersClient.send('users.findByEmail', email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersClient.send('users.update', { id, updateUserDto });
  }

  remove(id: number) {
    return this.usersClient.send('users.remove', id);
  }
}
