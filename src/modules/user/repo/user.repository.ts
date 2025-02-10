import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from 'src/modules/user/entity/user.entity';

export class UserRepository extends EntityRepository<User> {}
