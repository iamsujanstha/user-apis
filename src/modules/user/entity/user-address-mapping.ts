import { ManyToOne } from '@mikro-orm/core';
import { User } from 'src/modules/user/entity/user.entity';
import { Address } from 'src/modules/address/entity/address.entity';
import { PrimaryEntity } from 'src/common/entities/primary.entity';

export class UserAddressMapping extends PrimaryEntity {
  @ManyToOne(() => User)
  userId: User;

  @ManyToOne(() => Address)
  addressId: Address;
}
