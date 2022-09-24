import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT);
  logger.log(`O servidor está rodando na porta: ${PORT}`);
}
bootstrap();
