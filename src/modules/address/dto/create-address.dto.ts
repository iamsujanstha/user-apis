import { IsNotEmpty, IsString } from 'class-validator';
// import { addressType } from 'src/common/enums/address.enum';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  districtId: number;

  @IsNotEmpty()
  provinceId: number;

  @IsNotEmpty()
  pinCode: string;

  // @IsNotEmpty()
  // @IsEnum(addressType)
  // type: addressType;
}
