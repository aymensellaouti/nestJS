import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Tasks Management')
    .setDescription('The Tasks API description')
    .setVersion('1.0')
    .addTag('Tasks')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // const corsOptions = {
  //   origin: [
  //     /^(.*)/,
  //   ],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: true,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // };
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
