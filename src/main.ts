import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('The Blog')
    .setDescription('API for The Blog app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const uiOptions: SwaggerCustomOptions = {
    customSiteTitle: 'The Blog api documentation',
  };
  SwaggerModule.setup('api/v1/docs', app, document, uiOptions);

  await app.listen(process.env.PORT);
}
bootstrap();
