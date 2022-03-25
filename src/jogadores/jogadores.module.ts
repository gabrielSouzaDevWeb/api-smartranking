import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './service/jogadores.service';

@Module({
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
