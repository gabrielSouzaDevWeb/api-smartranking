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
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { response } from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async CriarAtualizarJogador(@Body() CriarJogadorDto: CriarJogadorDto) {
    // const { email } = CriarJogadorDto;
    // return JSON.stringify(`{"email":${email}}`);
    return await this.jogadoresService.criarAtualizarJogador(CriarJogadorDto);
  }
  @Get('get-all')
  async getAll() {
    return this.jogadoresService.getAll();
  }

  @Get('by-id/:_id')
  async getJogadorPorEmail(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
    @Res() res,
  ) {
    if (_id) {
      return this.jogadoresService.getJogadorPorId(_id).then((data) => {
        return data
          ? res.status(200).send(data)
          : res.status(200).send({
              message: `Não há nenhum jogador com o E-mail: '${_id}'`,
              data: [],
            });
      });
    } else {
      res.status(400).send({ message: 'Por favor insira um email' });
      // throw new Error("'Por favor insira um email'");
    }
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
    @Param('_id') _id: string,
    @Res() response,
  ): Promise<void> {
    await this.jogadoresService
      .atualizarJogador(criarJogadorDto, _id)
      .then((data) => {
        response
          .status(HttpStatus.OK)
          .send({ message: 'Jogador atualizado com sucesso', data });
      });
  }

  @Delete(':_id')
  async deleteByEmail(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
    @Res() res,
  ) {
    console.log(_id);

    if (_id) {
      return this.jogadoresService.deleteByEmail(_id).then((data) => {
        return data
          ? res.status(200).send(data)
          : res.status(200).send({
              message: `Não há nenhum jogador com o E-mail: '${_id}'`,
              data,
            });
      });
    } else {
      res.status(400).send({ message: 'Por favor insira um _id' });
      // throw new Error("'Por favor insira um email'");
    }
  }

  // @Put("")
}
