import { Injectable } from '@nestjs/common';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  PrismaService,
} from '@app/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<UserDto | null> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
