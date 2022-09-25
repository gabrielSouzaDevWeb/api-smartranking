import { CriarDesafioDto } from './dtos/desafio.dto';
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
  async getDesafios(@Res() res: any, @Req() req: any) {
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
}
