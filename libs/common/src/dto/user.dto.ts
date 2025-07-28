export class UserDto {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional for responses, we'll exclude this in practice
  createdAt: Date;
  updatedAt: Date;
}
