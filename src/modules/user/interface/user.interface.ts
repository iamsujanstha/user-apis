import { User } from 'src/modules/user/entity/user.entity';
import { UserDto } from '../dto/user.dto';

export interface IUserInterface {
  getUserList(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }>;
  createUser(user: UserDto): Promise<User>;
  updateUser(id: string, user: UserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
