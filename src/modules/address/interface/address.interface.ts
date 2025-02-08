export interface AddressService {
    getAddress(): Promise<UserListDto>;
    createAddress(user: UserListDto): Promise<UserListDto>;
    updateAddress(user: UserListDto): Promise<UserListDto>;
    deleteAddress(id: string): Promise<void>;
}