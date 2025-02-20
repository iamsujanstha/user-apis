import { BaseEntity } from '@common/entities/base.entity';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { UserRepository } from '@module/user/repo/user.repository';
import { Exclude } from 'class-transformer';

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

  @Exclude()
  @Property({ nullable: true })
  refreshToken?: string;

  [EntityRepositoryType]?: UserRepository;
}
