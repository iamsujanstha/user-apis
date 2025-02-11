import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './modules/address/address.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { mikroOrmConfig } from './database/mikro-orm/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from 'src/shared/interceptors/success-response.interceptor';
import { SantizeResponseInterceptor } from 'src/shared/interceptors/sanitized-response.interceptor';

@Module({
  imports: [
    AddressModule,
    UserModule,
    RoleModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
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
  ],
})
export class AppModule {}
