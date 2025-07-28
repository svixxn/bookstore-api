import { Injectable } from '@nestjs/common';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  PrismaService,
} from '@app/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    // Exclude passwords from all users
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: number): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    // Exclude password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    // Exclude password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    try {
      // Hash password if provided in update
      const updateData = { ...updateUserDto };
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });

      // Exclude password from response
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<UserDto | null> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      // Exclude password from response
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }
}
