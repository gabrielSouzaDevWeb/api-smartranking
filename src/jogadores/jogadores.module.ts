import { JogadorSchema } from './entity/jogador.schema';
import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  exports: [JogadoresService],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
