import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('App developed with NestJs, MongoDB (Mongoose) and Swagger')
    .setVersion('1.0')
    .setTitle('Nest API')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
