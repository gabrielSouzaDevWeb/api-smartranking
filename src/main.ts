import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('PORT');
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  setTimeout((e) => {
    logger.log(`O servidor está rodando na porta: ${PORT}`);
  }, 50);
  await app.listen(PORT);
}
bootstrap();
