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
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(@Body() criarJogadorDto: CriarJogadorDto,@Param('_id', JogadoresValidacaoParametrosPipe)) {
    await this.jogadoresService.atualizaJogador(_id,criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<IJogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get(`/:_id`)
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<IJogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete(`/:_id`)
  async deleteJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }

  // @Put()
  // async atualizarJogadores(): Promise<Ijogador[]> {
  //   return this.jogadoresService.atualizarJogador;
  // }

  // @Put(){

  // }
}
