import { UserDto } from '../../user/dto/user.dto';

export interface IUser {
  getRole(): Promise<UserDto[]>;
  createRole(user: UserDto): Promise<UserDto>;
  updateRole(user: UserDto): Promise<UserDto>;
  deleteRole(id: string): Promise<void>;
}
