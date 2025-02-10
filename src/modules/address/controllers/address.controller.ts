import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

@Controller('address')
export class AddressController {
  public constructor(private readonly addressService: AddressService) {}

  @Post()
  public async createAddress(@Body() address: CreateAddressDto) {
    return this.addressService.createAddress(address);
  }
}
