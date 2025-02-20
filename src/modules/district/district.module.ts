import { MikroOrmModule } from '@mikro-orm/nestjs';
import { District } from '@module/district/entity/district.entity';
import { DistrictRepository } from '@module/district/repo/district.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [DistrictRepository],
  imports: [MikroOrmModule.forFeature([District])],
})
export class DistrictModule {}
