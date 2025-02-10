import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { PrimaryEntity } from 'src/common/entities/primary.entity';
import { Office } from 'src/modules/office/entity/office.entity';
import { User } from 'src/modules/user/entity/user.entity';

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
