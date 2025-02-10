import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserOfficeMapping } from 'src/modules/user/entity/user-office-mapping.entity';

@Entity({
  tableName: 'offices',
})
export class Office extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  contact!: string;

  @Property()
  address!: string;

  @Property()
  pan!: string;

  @OneToMany(() => UserOfficeMapping, (mapping) => mapping.office)
  userMappings = new Collection<UserOfficeMapping>(this);
}
