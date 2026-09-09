import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import { logger } from './common/middlewares/logger.middlewares.js';
import { ResponseInterceptors } from './interceptors/response.interceptors.js';
import { AllExceptionFilter } from './common/filters/all-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptors());

  app.useGlobalFilters(new AllExceptionFilter());

  app.use(logger);

  await app.listen(3000);
}
await bootstrap();
