import { Migration } from '@mikro-orm/migrations';

export class Migration20250210110817 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "districts" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "offices" ("id" serial primary key, "name" varchar(255) not null, "contact" varchar(255) not null, "address" varchar(255) not null, "pan" varchar(255) not null);`);

    this.addSql(`create table "Province" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "addresses" ("id" serial primary key, "city" varchar(255) not null, "pin_code" varchar(255) not null, "district_id" int not null, "province_id_id" int not null, "type" text check ("type" in ('PRIMARY', 'SECONDARY')) not null);`);

    this.addSql(`create table "roles" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null);`);

    this.addSql(`create table "users" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);`);

    this.addSql(`create table "user_office_mappings" ("id" serial primary key, "user_id_id" int not null, "office_id_id" int not null, "assigned_at" timestamptz not null);`);

    this.addSql(`create table "user_role_mappings" ("id" serial primary key, "user_id_id" int not null, "role_id_id" int not null, "assigned_at" timestamptz not null);`);

    this.addSql(`alter table "addresses" add constraint "addresses_district_id_foreign" foreign key ("district_id") references "districts" ("id") on update cascade;`);
    this.addSql(`alter table "addresses" add constraint "addresses_province_id_id_foreign" foreign key ("province_id_id") references "Province" ("id") on update cascade;`);

    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_office_mappings" add constraint "user_office_mappings_office_id_id_foreign" foreign key ("office_id_id") references "offices" ("id") on update cascade;`);

    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_user_id_id_foreign" foreign key ("user_id_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_role_mappings" add constraint "user_role_mappings_role_id_id_foreign" foreign key ("role_id_id") references "roles" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "addresses" drop constraint "addresses_district_id_foreign";`);

    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_office_id_id_foreign";`);

    this.addSql(`alter table "addresses" drop constraint "addresses_province_id_id_foreign";`);

    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_role_id_id_foreign";`);

    this.addSql(`alter table "user_office_mappings" drop constraint "user_office_mappings_user_id_id_foreign";`);

    this.addSql(`alter table "user_role_mappings" drop constraint "user_role_mappings_user_id_id_foreign";`);

    this.addSql(`drop table if exists "districts" cascade;`);

    this.addSql(`drop table if exists "offices" cascade;`);

    this.addSql(`drop table if exists "Province" cascade;`);

    this.addSql(`drop table if exists "addresses" cascade;`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "user_office_mappings" cascade;`);

    this.addSql(`drop table if exists "user_role_mappings" cascade;`);
  }

}
