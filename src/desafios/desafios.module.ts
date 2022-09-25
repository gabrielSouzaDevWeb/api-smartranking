import { CategoriasModule } from './../categorias/categorias.module';
import { JogadoresModule } from './../jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './entity/desafio.schema';
import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafios', schema: DesafioSchema }]),
    JogadoresModule,
    CategoriasModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
