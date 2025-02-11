import { PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

export class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Exclude()
  @Property({ hidden: true })
  createdAt = new Date();

  @Exclude()
  @Property({ onUpdate: () => new Date(), hidden: true })
  updatedAt = new Date();
}
