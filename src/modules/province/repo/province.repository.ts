import { EntityRepository } from '@mikro-orm/postgresql';
import { Province } from '@module/province/entity/province.entity';

export class ProvinceRepository extends EntityRepository<Province> {}
