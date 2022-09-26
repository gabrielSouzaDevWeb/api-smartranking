import { AlterarDesafioDto } from './dtos/alterar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafiosService } from './desafios.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Get,
  Res,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { send } from 'process';

@Controller('api/v1/desafios')
@UsePipes(ValidationPipe)
export class DesafiosController {
  constructor(private readonly service: DesafiosService) {}
  @Post()
  async criarDesafio(
    @Res() res: any,
    @Req() req: any,
    @Body() body: CriarDesafioDto,
  ) {
    return this.service
      .criarDesafio(body, req)
      .then((data) => {
        return res
          .status(HttpStatus.OK)
          .send({ message: `Desafio criado com sucesso!`, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get()
  async pegarDesafios(@Res() res: any, @Req() req: any) {
    const { jogadorId } = req.query;
    return this.service
      .getDesafios(jogadorId)
      .then((data) => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!', data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Put(`/:desafioId`)
  async alterarDesafio(
    @Res() res: any,
    @Req() req: any,
    @Body() body: AlterarDesafioDto,
  ) {
    const { desafioId } = req.params;
    return this.service
      .alterarDesafio(desafioId, body)
      .then((data) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Desafio editado com sucesso!', data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Delete(`/:desafioId`)
  async deletarDesafio(
    @Res() res: any,
    @Req() req: any,
    @Param('desafioId') desafioId: string,
  ) {
    return this.service
      .deletarDesafio(desafioId)
      .then((data) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Desafio deletado com sucesso', data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
