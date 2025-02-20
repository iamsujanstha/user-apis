import { EntityRepository } from '@mikro-orm/postgresql';
import { District } from '@module/district/entity/district.entity';

export class DistrictRepository extends EntityRepository<District> {}
