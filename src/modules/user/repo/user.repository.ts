import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from 'src/modules/user/entity/user.entity';

export class UserRepository extends EntityRepository<User> {
  public async findAllUsers(
    limit: number,
    offset: number,
  ): Promise<{ data: User[]; total: number }> {
    // ✅ Ensure offset is always non-negative
    offset = Math.max(offset, 0);
    console.log('offset=' + offset, 'limit=' + limit);
    // ✅ Query to fetch paginated users
    const users = (
      await this.em.execute(
        `SELECT * FROM "users" ORDER BY "created_at" DESC LIMIT ? OFFSET ?`,
        [limit, offset],
      )
    ).map((user) => this.em.map(User, user));

    // ✅ Correct the table name for COUNT query (should be "users", not "user")
    const totalCountResult = await this.em.execute(
      `SELECT COUNT(*) FROM "users"`,
    );
    const total = parseInt(totalCountResult[0].count, 10); // Convert string count to number

    return { data: users, total };
  }
}
