import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
import { response } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async CriarAtualizarJogador(
    @Body() CriarJogadorDto: CriarJogadorDto,
    @Res() res,
  ) {
    return await this.jogadoresService
      .criarJogador(CriarJogadorDto)
      .then((data) => {
        res
          .status(HttpStatus.CREATED)
          .send({ message: 'jogador criado com sucesso', data });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Get('get-all')
  async getAll(@Res() response) {
    return this.jogadoresService
      .getAll()
      .then((data) => {
        response
          .status(HttpStatus.OK)
          .send({ message: 'Consulta realizada com sucesso', data });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Get('by-id/:_id')
  async getJogadorPorEmail(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Res() response,
  ) {
    return this.jogadoresService
      .consultarJogadorPeloId(_id)
      .then((data) => {
        return response.status(200).send({
          message: `Consulta realizada com sucesso`,
          data,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id') _id: string,
    @Res() response,
  ): Promise<void> {
    await this.jogadoresService
      .atualizarJogador(_id, atualizarJogadorDto)
      .then((data) => {
        response
          .status(HttpStatus.OK)
          .send({ message: 'Jogador atualizado com sucesso', data });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Delete(':_id')
  async deleteByEmail(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Res() res,
  ) {
    return this.jogadoresService.deleteByEmail(_id).then((data) => {
      return res
        .status(HttpStatus.OK)
        .send({ message: 'jogador excluído com sucesso', data: [] })
        .catch((err) => {
          throw new Error(err);
        });
    });
  }
}
