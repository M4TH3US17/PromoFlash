import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap () {
  console.log(process.env)
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  await app.listen(3000);
}

bootstrap();
