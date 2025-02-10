import { Migration } from '@mikro-orm/migrations';

export class Migration20250210132415 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "districts" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "offices" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "addresses" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "roles" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "users" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null, add column "middle name" varchar(255) not null, add column "last name" varchar(255) not null;`);
    this.addSql(`alter table "users" rename column "name" to "first name";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "districts" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "offices" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "addresses" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "roles" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "users" drop column "created_at", drop column "updated_at", drop column "middle name", drop column "last name";`);

    this.addSql(`alter table "users" rename column "first name" to "name";`);
  }

}
