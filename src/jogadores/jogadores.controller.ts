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
    @Query('nome') nome: string,
    @Query('telefoneCelular') telefoneCelular: string,
  ): Promise<IJogador | IJogador[]> {
    let i = email || nome || telefoneCelular;
    if (i) {
      return await this.jogadoresService.consultarJogadorPeloEmail(i);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deleteJogador(@Query('email') email: string): Promise<void> {
    console.log(1, email);

    this.jogadoresService.deletarJogador(email);
  }

  // @Put()
  // async atualizarJogadores(): Promise<Ijogador[]> {
  //   return this.jogadoresService.atualizarJogador;
  // }

  // @Put(){

  // }
}
