import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRepository } from 'src/modules/user/repo/user.repository';

@Entity({
  tableName: 'users',
  repository: () => UserRepository,
})
export class User extends BaseEntity {
  @Property({ fieldName: 'first name', type: 'string' })
  firstName!: string;

  @Property({ fieldName: 'middle name', type: 'string' })
  middleName?: string;

  @Property({ fieldName: 'last name', type: 'string' })
  lastName!: string;

  @Property({ fieldName: 'email', type: 'string', unique: true })
  email!: string;

  @Exclude()
  @Property({ fieldName: 'password', type: 'string' })
  password!: string;

  [EntityRepositoryType]?: UserRepository;
}
