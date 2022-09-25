import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as momentTimeZone from 'moment-timezone';

async function bootstrap() {
  const logger = new Logger('Main');
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimeZone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(PORT);
  logger.log(`O servidor está rodando na porta: ${PORT}`);
}
bootstrap();
