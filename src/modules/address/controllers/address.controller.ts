import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAddressDto } from '@module/address/dto/create-address.dto';
import { AddressService } from '@module/address/services/address.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  public constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create address' })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully created.',
  })
  public async createAddress(@Body() address: CreateAddressDto) {
    return this.addressService.createAddress(address);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated address list' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved address list.',
  })
  public async getAddress() {
    return this.addressService.getAddress();
  }
}
