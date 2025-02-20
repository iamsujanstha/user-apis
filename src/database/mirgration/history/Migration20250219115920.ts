import { Migration } from '@mikro-orm/migrations';

export class Migration20250219115920 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "districts" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null);`,
    );

    this.addSql(
      `create table "offices" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null, "contact" varchar(255) not null, "address" varchar(255) not null, "pan" varchar(255) not null);`,
    );

    this.addSql(
      `create table "province" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null);`,
    );

    this.addSql(
      `create table "addresses" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "city" varchar(255) not null, "pin_code" varchar(255) not null, "district_id" int not null, "province_id" int not null);`,
    );

    this.addSql(
      `create table "roles" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null, "description" varchar(255) not null);`,
    );

    this.addSql(
      `create table "users" ("id" serial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "first name" varchar(255) not null, "middle name" varchar(255) not null, "last name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );

    this.addSql(
      `create table "user_office_mappings" ("id" serial primary key, "user_id" int not null, "office_id" int not null, "assigned_at" timestamptz not null);`,
    );

    this.addSql(
      `create table "user_role_mappings" ("id" serial primary key, "user_id" int not null, "role_id" int not null, "assigned_at" timestamptz not null);`,
    );

    this.addSql(
      `alter table "addresses" add constraint "addresses_district_id_foreign" foreign key ("district_id") references "districts" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "addresses" add constraint "addresses_province_id_foreign" foreign key ("province_id") references "province" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "user_office_mappings" add constraint "user_office_mappings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "user_office_mappings" add constraint "user_office_mappings_office_id_foreign" foreign key ("office_id") references "offices" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "user_role_mappings" add constraint "user_role_mappings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "user_role_mappings" add constraint "user_role_mappings_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "addresses" drop constraint "addresses_district_id_foreign";`,
    );

    this.addSql(
      `alter table "user_office_mappings" drop constraint "user_office_mappings_office_id_foreign";`,
    );

    this.addSql(
      `alter table "addresses" drop constraint "addresses_province_id_foreign";`,
    );

    this.addSql(
      `alter table "user_role_mappings" drop constraint "user_role_mappings_role_id_foreign";`,
    );

    this.addSql(
      `alter table "user_office_mappings" drop constraint "user_office_mappings_user_id_foreign";`,
    );

    this.addSql(
      `alter table "user_role_mappings" drop constraint "user_role_mappings_user_id_foreign";`,
    );

    this.addSql(`drop table if exists "districts" cascade;`);

    this.addSql(`drop table if exists "offices" cascade;`);

    this.addSql(`drop table if exists "province" cascade;`);

    this.addSql(`drop table if exists "addresses" cascade;`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "user_office_mappings" cascade;`);

    this.addSql(`drop table if exists "user_role_mappings" cascade;`);
  }
}
