import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './common/array-extentions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
