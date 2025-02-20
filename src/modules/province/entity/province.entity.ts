import { BaseEntity } from '@common/entities/base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'province' })
export class Province extends BaseEntity {
  @Property()
  name!: string;
}
