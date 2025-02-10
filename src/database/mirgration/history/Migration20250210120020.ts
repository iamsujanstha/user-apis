import { Migration } from '@mikro-orm/migrations';

export class Migration20250210120020 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "addresses" drop constraint "addresses_district_id_id_foreign";`);
    this.addSql(`alter table "addresses" drop constraint "addresses_province_id_id_foreign";`);

    this.addSql(`alter table "addresses" drop column "district_id_id", drop column "province_id_id";`);

    this.addSql(`alter table "addresses" add column "district_id" int not null, add column "province_id" int not null;`);
    this.addSql(`alter table "addresses" add constraint "addresses_district_id_foreign" foreign key ("district_id") references "districts" ("id") on update cascade;`);
    this.addSql(`alter table "addresses" add constraint "addresses_province_id_foreign" foreign key ("province_id") references "Province" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "addresses" drop constraint "addresses_district_id_foreign";`);
    this.addSql(`alter table "addresses" drop constraint "addresses_province_id_foreign";`);

    this.addSql(`alter table "addresses" drop column "district_id", drop column "province_id";`);

    this.addSql(`alter table "addresses" add column "district_id_id" int not null, add column "province_id_id" int not null;`);
    this.addSql(`alter table "addresses" add constraint "addresses_district_id_id_foreign" foreign key ("district_id_id") references "districts" ("id") on update cascade;`);
    this.addSql(`alter table "addresses" add constraint "addresses_province_id_id_foreign" foreign key ("province_id_id") references "Province" ("id") on update cascade;`);
  }

}
