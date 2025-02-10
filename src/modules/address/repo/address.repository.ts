import { EntityRepository } from '@mikro-orm/postgresql';
import { Address } from 'src/modules/address/entity/address.entity';

export class AddressRepository extends EntityRepository<Address> {}
