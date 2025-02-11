import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupMiddlewares } from 'src/config/middlewares.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupMiddlewares(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
