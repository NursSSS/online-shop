import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MissDress')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
