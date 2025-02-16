import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '@module/user/entity/user.entity';

export class UserRepository extends EntityRepository<User> {
  public async findAllUsers(
    limit: number,
    offset: number,
  ): Promise<{ data: User[]; total: number }> {
    offset = Math.max(offset, 0);
    console.log('offset=' + offset, 'limit=' + limit);

    const users = (
      await this.em.execute(
        `SELECT * FROM "users" ORDER BY "created_at" DESC LIMIT ? OFFSET ?`,
        [limit, offset],
      )
    ).map((user) => this.em.map(User, user));

    const totalCountResult = await this.em.execute(
      `SELECT COUNT(*) FROM "users"`,
    );
    const total = parseInt(totalCountResult[0].count, 10);

    return { data: users, total };
  }
}
