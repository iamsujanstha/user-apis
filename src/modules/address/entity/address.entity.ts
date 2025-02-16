import { BaseEntity } from '@common/entities/base.entity';
import { addressType } from '@common/enums/address.enum';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { District } from '@module/district/entity/district.entity';
import { Province } from '@module/province/entity/province.entity';

@Entity({
  tableName: 'addresses',
})
export class Address extends BaseEntity {
  @Property()
  city!: string;

  @Property()
  pinCode!: string;

  @ManyToOne({
    entity: () => District,
  })
  district!: District;

  @ManyToOne({
    entity: () => Province,
  })
  province!: Province;

  @Enum({ items: () => addressType })
  type!: addressType;
}
