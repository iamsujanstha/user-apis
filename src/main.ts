import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupMiddlewares } from 'src/config/middlewares.config';

async function bootstrap() {
  if (!process.env.IS_TS_NODE) {
    await import('module-alias/register');
  }
  const app = await NestFactory.create(AppModule);
  setupMiddlewares(app);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('application runing on port 3000');
  });
}
bootstrap();
