import { Module } from '@nestjs/common';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Address } from 'src/modules/address/entity/address.entity';
import { AddressRepository } from 'src/modules/address/repo/address.repository';

@Module({
  controllers: [AddressController],
  imports: [MikroOrmModule.forFeature([Address])],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
