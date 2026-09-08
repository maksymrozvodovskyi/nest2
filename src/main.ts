import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
=======
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
>>>>>>> main

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

<<<<<<< HEAD
  await app.listen(process.env.PORT ?? 3000);
=======
  await app.listen(3000);
>>>>>>> main
}
await bootstrap();
