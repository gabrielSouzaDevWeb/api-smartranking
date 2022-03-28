import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gabriel:gabriel@cluster0.4rqbp.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    ,
    JogadoresModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
