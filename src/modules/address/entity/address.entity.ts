import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { District } from '../../district/entity/district.entity';
import { Province } from '../../province/entity/province.entity';
import { addressType } from '../../../common/enums/address.enum';
import { BaseEntity } from 'src/common/entities/base.entity';

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
