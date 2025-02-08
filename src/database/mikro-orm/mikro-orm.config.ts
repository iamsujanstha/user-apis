import { defineConfig, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { postgresConfig } from 'src/configs/db-connections.config';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
    dbName: postgresConfig.dbName,
    driver: PostgreSqlDriver,
    host: postgresConfig.host,
    port: postgresConfig.port,
    user: postgresConfig.username,
    password: postgresConfig.password,

    // Entity paths
    entities: ['./dist/database/entities/*.js'], // For production
    entitiesTs: ['./src/database/entities/*.ts'], // For development

    // Debugging and migrations
    debug: true, // Enable debug in non-production environments
    migrations: {
        tableName: 'mikro_orm_migrations', // Custom table name for migrations
        path: './dist/src/database/migration/history',
        pathTs: './src/database/mirgration/history',
        glob: '!(*.d).{js,ts}', // Match JS and TS files
    },
};

const MikroOrmDataSource = defineConfig(mikroOrmConfig);

export { mikroOrmConfig };

export default MikroOrmDataSource;
