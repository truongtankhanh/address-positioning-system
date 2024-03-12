import { config } from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { AppDataSource, databaseOptions } from '../database/config';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('API document')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // START: connect database
  // AppDataSource.setOptions(databaseOptions(process.env));
  // AppDataSource.driver.options = AppDataSource.options;

  // if (AppDataSource.isInitialized) {
  //   Logger.debug('Reusing existing connection.');
  // } else {
  //   await AppDataSource.initialize();
  //   Logger.debug('Data Source has been initialized!');
  // }
  // END: connect database

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Docs API is running on: http://localhost:${port}/api-docs`);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
