import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
// import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({ tableName: 'Province' })
export class Province {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
