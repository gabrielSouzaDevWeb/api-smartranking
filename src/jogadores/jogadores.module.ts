import { JogadorSchema } from './interfaces/jogador.schema';
import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresService } from './service/jogadores.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
