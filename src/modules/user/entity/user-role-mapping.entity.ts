import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';
import { Role } from 'src/modules/role/entity/role.entity';
import { PrimaryEntity } from 'src/common/entities/primary.entity';

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
