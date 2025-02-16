import { EntityRepository } from '@mikro-orm/postgresql';
import { Address } from '@module/address/entity/address.entity';

export class AddressRepository extends EntityRepository<Address> {}
