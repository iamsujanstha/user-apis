/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddressService } from '../interface/address.interface';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressRepository } from 'src/modules/address/repo/address.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService implements IAddressService {
  constructor(private addressRepo: AddressRepository) {}

  async createAddress(addressDto: CreateAddressDto): Promise<CreateAddressDto> {
    // Fetch the District entity by its ID
    // const district = await this.districtRepo.findOne(addressDto.districtId);
    // if (!district) {
    //   throw new Error('District not found');
    // }

    // // Fetch the Province entity by its ID
    // const province = await this.provinceRepo.findOne(addressDto.provinceId);
    // if (!province) {
    //   throw new Error('Province not found');
    // }

    // // Create a new Address entity and map the fields
    // const newAddress = this.addressRepo.create({
    //   city: addressDto.city,
    //   pinCode: addressDto.pinCode,
    //   type: addressDto.type,
    //   districtId: district, // Here we assign the full District entity
    //   provinceId: province, // Here we assign the full Province entity
    // });

    // // Persist the new Address entity to the database
    // await this.addressRepo.persistAndFlush(newAddress);

    // Return the DTO or the new address (depending on your requirements)
    return addressDto;
  }

  deleteAddress(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getAddress(): Promise<CreateAddressDto[]> {
    return Promise.resolve([]);
  }

  updateAddress(user: CreateAddressDto): Promise<CreateAddressDto> {
    return Promise.resolve(undefined);
  }
}
