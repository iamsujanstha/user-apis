import { PrimaryEntity } from '@common/entities/primary.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Office } from '@module/office/entity/office.entity';
import { User } from '@module/user/entity/user.entity';

@Entity({
  tableName: 'user_office_mappings',
})
export class UserOfficeMapping extends PrimaryEntity {
  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Office)
  office!: Office;

  @Property({ onUpdate: () => new Date() })
  assignedAt!: Date;
}
