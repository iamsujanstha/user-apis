import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupMiddlewares } from 'src/config/middlewares.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 'loopback'); // Trust requests from the loopback address

  setupMiddlewares(app);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('application runing on port 3000');
  });
}
bootstrap();
