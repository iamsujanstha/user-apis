import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './modules/address/address.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { mikroOrmConfig } from './database/mikro-orm/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from 'src/shared/interceptors/success-response.interceptor';
import { SantizeResponseInterceptor } from 'src/shared/interceptors/sanitized-response.interceptor';
import { AuthModule } from '@module/auth/auth.module';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import redisConfig from 'src/config/redis.config';
import { GlobalModule } from '@module/global/global.module';
import { Middleware2 } from './middlewares/class-based.middleware';
import { UserController } from '@module/user/controllers/user.controller';
import { LoggingMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    AddressModule,
    UserModule,
    RoleModule,
    AuthModule,
    GlobalModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SantizeResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware2, LoggingMiddleware) // Apply Middleware2 (Can also pass multiple middlewares in an array)
      .exclude({
        path: '', // Excludes a specific route (empty path means the base route)
        version: undefined, // Used for versioning in API routes (if applicable)
        method: RequestMethod.POST, // Excludes the middleware for **POST requests** on this route
      })
      .forRoutes(UserController); // Apply middleware only to `UserController`
    // If you want to apply middleware to **all routes**, use `.forRoutes('*')`
  }
}
