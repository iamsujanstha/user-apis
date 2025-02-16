import { PrimaryEntity } from '@common/entities/primary.entity';
import { ManyToOne } from '@mikro-orm/core';
import { Address } from '@module/address/entity/address.entity';
import { User } from '@module/user/entity/user.entity';

export class UserAddressMapping extends PrimaryEntity {
  @ManyToOne(() => User)
  userId: User;

  @ManyToOne(() => Address)
  addressId: Address;
}
