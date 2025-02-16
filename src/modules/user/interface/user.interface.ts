import { UserDto } from '@module/user/dto/user.dto';
import { User } from '@module/user/entity/user.entity';

export interface IUserInterface {
  getUserList(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }>;
  createUser(user: UserDto): Promise<User>;
  updateUser(id: string, user: UserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
