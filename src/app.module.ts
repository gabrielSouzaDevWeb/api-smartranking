import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [JogadoresModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
