import { Migration } from '@mikro-orm/migrations';

export class Migration20250210115809 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "addresses" drop constraint "addresses_district_id_foreign";`);

    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_user_id_id_foreign";`);
    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_office_id_id_foreign";`);

    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_user_id_id_foreign";`);
    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_role_id_id_foreign";`);

    this.addSql(`alter table "addresses" rename column "district_id" to "district_id_id";`);
    this.addSql(`alter table "addresses" add constraint "addresses_district_id_id_foreign" foreign key ("district_id_id") references "districts" ("id") on update cascade;`);

    this.addSql(`alter table "user_office_mappings" drop column "user_id_id", drop column "office_id_id";`);

    this.addSql(`alter table "user_office_mappings" add column "user_id" int not null, add column "office_id" int not null;`);
    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_office_id_foreign" foreign key ("office_id") references "offices" ("id") on update cascade;`);

    this.addSql(`alter table "user_role_mappings" drop column "user_id_id", drop column "role_id_id";`);

    this.addSql(`alter table "user_role_mappings" add column "user_id" int not null, add column "role_id" int not null;`);
    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "addresses" drop constraint "addresses_district_id_id_foreign";`);

    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_user_id_foreign";`);
    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_office_id_foreign";`);

    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_user_id_foreign";`);
    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_role_id_foreign";`);

    this.addSql(`alter table "addresses" rename column "district_id_id" to "district_id";`);
    this.addSql(`alter table "addresses" add constraint "addresses_district_id_foreign" foreign key ("district_id") references "districts" ("id") on update cascade;`);

    this.addSql(`alter table "user_office_mappings" drop column "user_id", drop column "office_id";`);

    this.addSql(`alter table "user_office_mappings" add column "user_id_id" int not null, add column "office_id_id" int not null;`);
    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_office_id_id_foreign" foreign key ("office_id_id") references "offices" ("id") on update cascade;`);

    this.addSql(`alter table "user_role_mappings" drop column "user_id", drop column "role_id";`);

    this.addSql(`alter table "user_role_mappings" add column "user_id_id" int not null, add column "role_id_id" int not null;`);
    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_role_id_id_foreign" foreign key ("role_id_id") references "roles" ("id") on update cascade;`);
  }

}
