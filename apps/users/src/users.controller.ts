import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('users.findOne')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.findByEmail')
  findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern('users.update')
  update(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern('users.remove')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
