import { CriarDesafioDto } from './dtos/desafio.dto';
import { DesafiosService } from './desafios.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

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
}
