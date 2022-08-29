import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    JogadoresModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONECTION),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
