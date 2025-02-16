import { CreateAddressDto } from '@module/address/dto/create-address.dto';

export interface IAddressService {
  getAddress(): Promise<CreateAddressDto[]>;
  createAddress(address: CreateAddressDto): Promise<CreateAddressDto>;
  updateAddress(user: CreateAddressDto): Promise<CreateAddressDto>;
  deleteAddress(id: string): Promise<void>;
}
