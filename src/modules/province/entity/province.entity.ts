import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({ tableName: 'Province' })
export class Province extends BaseEntity {
  @Property()
  name!: string;
}
