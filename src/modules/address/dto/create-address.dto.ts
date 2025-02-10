import { addressType } from 'src/common/enums/address.enum';

export interface CreateAddressDto {
  city: string;
  districtId: number;
  provinceId: number;
  pinCode: string;
  type: addressType;
}
