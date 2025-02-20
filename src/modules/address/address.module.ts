import { Module } from '@nestjs/common';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Address } from 'src/modules/address/entity/address.entity';
import { AddressRepository } from 'src/modules/address/repo/address.repository';
import { DistrictModule } from '@module/district/district.module';
import { ProvinceModule } from '@module/province/province.module';
import { DistrictRepository } from '@module/district/repo/district.repository';
import { ProvinceRepository } from '@module/province/repo/province.repository';
import { District } from '@module/district/entity/district.entity';
import { Province } from '@module/province/entity/province.entity';

@Module({
  controllers: [AddressController],
  imports: [
    MikroOrmModule.forFeature([Address, District, Province]),
    DistrictModule,
    ProvinceModule,
  ],
  providers: [
    AddressService,
    AddressRepository,
    DistrictRepository,
    ProvinceRepository,
  ],
})
export class AddressModule {}
