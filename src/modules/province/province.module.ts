import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Province } from '@module/province/entity/province.entity';
import { ProvinceRepository } from '@module/province/repo/province.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [ProvinceRepository],
  imports: [MikroOrmModule.forFeature([Province])],
  exports: [ProvinceRepository],
})
export class ProvinceModule {}
