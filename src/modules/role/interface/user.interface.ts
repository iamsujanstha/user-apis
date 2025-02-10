import { UserListDto } from '../../user/dto/userList.dto';

export interface IUser {
  getRole(): Promise<UserListDto[]>;
  createRole(user: UserListDto): Promise<UserListDto>;
  updateRole(user: UserListDto): Promise<UserListDto>;
  deleteRole(id: string): Promise<void>;
}
