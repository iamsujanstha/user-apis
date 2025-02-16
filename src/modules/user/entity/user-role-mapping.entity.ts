import { PrimaryEntity } from '@common/entities/primary.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Role } from '@module/role/entity/role.entity';
import { User } from '@module/user/entity/user.entity';

@Entity({
  tableName: 'user_role_mappings',
})
export class UserRoleMapping extends PrimaryEntity {
  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Role)
  role!: Role;

  @Property({ onUpdate: () => new Date(), fieldName: 'assigned_at' })
  assignedAt!: Date; // Example of metadata property
}
