import {UserListDto} from "../../user/dto/userList.dto";

export interface IUser{
    getUserList(): Promise<UserListDto[]>;
    createUser(user: UserListDto): Promise<UserListDto>;
    updateUser(user: UserListDto): Promise<UserListDto>;
    deleteUser(id: string): Promise<void>;
}