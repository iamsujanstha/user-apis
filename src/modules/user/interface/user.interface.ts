import {UserListDto} from "../dto/userList.dto";

export interface IUserInterface{
    getUserList(): Promise<UserListDto>;
    createUser(user: UserListDto): Promise<UserListDto>;
    updateUser(user: UserListDto): Promise<UserListDto>;
    deleteUser(id: string): Promise<void>;
}