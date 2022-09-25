import { JogadoresModule } from './../jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './entity/categoria.schema';
import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadoresModule,
  ],
  exports: [CategoriasService],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
