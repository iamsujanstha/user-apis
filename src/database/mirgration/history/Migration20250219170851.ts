import { Migration } from '@mikro-orm/migrations';

export class Migration20250219170851 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" add column "refresh_token" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop column "refresh_token";`);
  }

}
