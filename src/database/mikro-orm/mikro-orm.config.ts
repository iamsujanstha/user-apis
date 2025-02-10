import { defineConfig, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { postgresConfig } from '../db-connection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  dbName: postgresConfig.dbName,
  driver: PostgreSqlDriver,
  host: postgresConfig.host,
  port: postgresConfig.port,
  user: postgresConfig.username,
  password: postgresConfig.password,

  // Entity paths
  entities: ['./dist/modules/**/entity/*.js'], // For production
  entitiesTs: ['./src/modules/**/entity/*.ts'], // For development

  extensions: [SeedManager],

  // Debugging and migrations
  debug: true, // Enable debug in non-production environments
  migrations: {
    tableName: 'mikro_orm_migrations', // Custom table name for migrations
    path: './dist/src/database/migration/history',
    pathTs: './src/database/mirgration/history',
    glob: '!(*.d).{js,ts}', // Match JS and TS files,
    generator: TSMigrationGenerator,
  },
};

const MikroOrmDataSource = defineConfig(mikroOrmConfig);

export { mikroOrmConfig };

export default MikroOrmDataSource;
