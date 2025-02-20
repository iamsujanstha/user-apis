/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '@module/address/repo/address.repository';
import { IAddressService } from '@module/address/interface/address.interface';
import { CreateAddressDto } from '@module/address/dto/create-address.dto';
import { DistrictRepository } from '@module/district/repo/district.repository';
import { ProvinceRepository } from '@module/province/repo/province.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Address } from '@module/address/entity/address.entity';
import { District } from '@module/district/entity/district.entity';
import { Province } from '@module/province/entity/province.entity';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    // private addressRepo: AddressRepository,
    // private districtRepo: DistrictRepository,
    // private provinceRepo: ProvinceRepository,
    @InjectRepository(Address)
    private readonly addressRepo: EntityRepository<Address>,
    @InjectRepository(District)
    private readonly districtRepo: EntityRepository<District>,
    @InjectRepository(Province)
    private readonly provinceRepo: EntityRepository<Province>,
  ) {}

  async createAddress(addressDto: CreateAddressDto): Promise<CreateAddressDto> {
    // Fetch the District entity by its ID
    const district = await this.districtRepo.findOne(addressDto.districtId);
    if (!district) {
      throw new NotFoundException('District not found');
    }

    // Fetch the Province entity by its ID
    const province = await this.provinceRepo.findOne(addressDto.provinceId);
    if (!province) {
      throw new NotFoundException('Province not found');
    }

    // Create a new Address entity and map the fields
    const newAddress = this.addressRepo.create({
      city: addressDto.city,
      pinCode: addressDto.pinCode,
      // type: addressDto.type,
      district: addressDto.districtId,
      province: addressDto.provinceId,
    });

    // Persist the new Address entity to the database
    await this.addressRepo.getEntityManager().persistAndFlush(newAddress);

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
