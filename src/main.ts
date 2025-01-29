import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap () {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  await app.listen(3000);
}

bootstrap();
