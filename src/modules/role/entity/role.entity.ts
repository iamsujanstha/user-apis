import { BaseEntity } from '@common/entities/base.entity';
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { UserRoleMapping } from '@module/user/entity/user-role-mapping.entity';

@Entity({
  tableName: 'roles',
})
export class Role extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description!: string;

  @OneToMany(() => UserRoleMapping, (mapping) => mapping.role)
  userMappings = new Collection<UserRoleMapping>(this);
}
