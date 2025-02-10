import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({ tableName: 'districts' })
export class District extends BaseEntity {
  @Property()
  name!: string;
}
