import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDto } from '@module/address/dto/create-address.dto';
import { AddressService } from '@module/address/services/address.service';

@Controller('address')
export class AddressController {
  public constructor(private readonly addressService: AddressService) {}

  @Post()
  public async createAddress(@Body() address: CreateAddressDto) {
    return this.addressService.createAddress(address);
  }
}
