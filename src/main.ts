import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap () {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  const APP_PORT: number = Number(process.env.PORT) || 3000;

  await app.listen(APP_PORT);
}

bootstrap();