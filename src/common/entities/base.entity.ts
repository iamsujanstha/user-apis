import { PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

export class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Exclude()
  @Property({ defaultRaw: 'NOW()' }) // Ensures default in DB
  createdAt!: Date;

  @Exclude()
  @Property({ onUpdate: () => new Date(), defaultRaw: 'NOW()' }) // Ensures default in DB
  updatedAt!: Date;
}
