import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async CriarAtualizarJogador(@Body() CriarJogadorDto: CriarJogadorDto) {
    // const { email } = CriarJogadorDto;
    // return JSON.stringify(`{"email":${email}}`);
    return await this.jogadoresService.criarAtualizarJogador(CriarJogadorDto);
  }
  @Get('get-all')
  async getAll() {
    return this.jogadoresService.getAll();
  }

  @Get('by-email')
  async getJogadorPorEmail(@Query('email') email: string, @Res() res) {
    if (email) {
      return this.jogadoresService
        .getJogadorPorEmail(email, res)
        .then((data) => {
          return data
            ? res.status(200).send(data)
            : res.status(200).send({
                message: `Não há nenhum jogador com o E-mail: '${email}'`,
                data: [],
              });
        });
    } else {
      res.status(400).send({ message: 'Por favor insira um email' });
      // throw new Error("'Por favor insira um email'");
    }
  }

  @Delete()
  async deleteByEmail(@Query('email') email: string, @Res() res) {
    if (email) {
      return this.jogadoresService.deleteByEmail(email).then((data) => {
        return data
          ? res.status(200).send(data)
          : res.status(200).send({
              message: `Não há nenhum jogador com o E-mail: '${email}'`,
              data: [],
            });
      });
    } else {
      res.status(400).send({ message: 'Por favor insira um email' });
      // throw new Error("'Por favor insira um email'");
    }
  }

  // @Put("")
}
