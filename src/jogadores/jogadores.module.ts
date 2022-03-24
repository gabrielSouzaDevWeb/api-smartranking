import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores/jogadores.controller';

@Module({
  controllers: [JogadoresController]
})
export class JogadoresModule {}
