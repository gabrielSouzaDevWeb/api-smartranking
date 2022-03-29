import { JogadoresService } from './service/jogadores.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { query } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  async criarAtualizaJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizaJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<IJogador | IJogador[]> {
    if (email) {
      return await this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deleteJogador(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }

  // @Put()
  // async atualizarJogadores(): Promise<Ijogador[]> {
  //   return this.jogadoresService.atualizarJogador;
  // }

  // @Put(){

  // }
}
