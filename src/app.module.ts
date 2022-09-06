import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONECTION),
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
