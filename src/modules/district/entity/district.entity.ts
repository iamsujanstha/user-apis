import { BaseEntity } from '@common/entities/base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'districts' })
export class District extends BaseEntity {
  @Property()
  name!: string;
}
