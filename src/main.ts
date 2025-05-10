import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from "@infrastructure/database/data-source";
import { SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from '@config/filters/http-exception.filter';
import { createSwaggerConfig } from '@config/swagger.config';
import "dotenv/config";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  const APP_PORT: number = Number(process.env.PORT) || 3000;
  const DB_NAME: string = process.env.DB_NAME;

  AppDataSource.initialize()
    .then(() => console.log(`Conexão com o banco "${DB_NAME}" foi inicializada!`))
    .catch((error) => console.error(`Conexão com o banco "${DB_NAME}" falhou! Erro:`, error));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*', // Ou '*' para desenvolvimento
    allowedHeaders: ['Content-Type', 'Authorization'], // ⚠️ Adicione 'Authorization'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Swagger Config
  const { docFactory, swaggerUiConfig } = createSwaggerConfig(app);
  SwaggerModule.setup('promoflash-doc', app, docFactory, swaggerUiConfig);

  await app.listen(APP_PORT);
};

bootstrap();