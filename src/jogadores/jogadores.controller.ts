import { JogadoresService } from './service/jogadores.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizaJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizaJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<IJogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get(`/:_id`)
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<IJogador> {
    return await this.jogadoresService.consultarJogadorPeloEmail(_id);
  }

  @Delete()
  async deleteJogador(
    @Query('email', JogadoresValidacaoParametrosPipe) email: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }

  // @Put()
  // async atualizarJogadores(): Promise<Ijogador[]> {
  //   return this.jogadoresService.atualizarJogador;
  // }

  // @Put(){

  // }
}
