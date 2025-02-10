import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({
  tableName: 'users',
})
export class User extends BaseEntity {
  @Property({ fieldName: 'first name', type: 'string' })
  firstName!: string;

  @Property({ fieldName: 'middle name', type: 'string' })
  middleName?: string;

  @Property({ fieldName: 'last name', type: 'string' })
  lastName?: string;

  @Property({ fieldName: 'email', type: 'string' })
  email!: string;

  @Property({ fieldName: 'password', type: 'string' })
  password!: string;
}
