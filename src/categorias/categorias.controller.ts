import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ICategoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  private message = {
    get: 'Consulta realizada com sucesso!',
    put: 'Categoria alterada com sucesso!',
    delete: 'Categoria removida com sucesso!',
  };
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('criar-categoria')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
    @Res() res,
  ): Promise<ICategoria> {
    return await this.categoriasService
      .criarCategoria(criarCategoriaDto)
      .then((data) => {
        return res.status(HttpStatus.OK).send({
          message: `Categoria "${criarCategoriaDto.categoria}" criada com sucesso!`,
          data: [data],
        });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get(`by-id/:_id`)
  async consultarCategoriasPorID(@Res() res, @Param('_id') _id: string) {
    return this.categoriasService
      .getById(_id)
      .then((data) => {
        res.status(HttpStatus.OK).send({ message: this.message.get, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
  @Get(`by-categoria/:categoria`)
  async consultarCategoria(@Res() res, @Param('categoria') categoria: string) {
    return this.categoriasService
      .getCategoria(categoria)
      .then((data) => {
        res.status(HttpStatus.OK).send({ message: this.message.get, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get('get-all')
  async consultarTodasAsCategorias(@Res() res) {
    return this.categoriasService
      .getAll()
      .then((data) => {
        res.status(HttpStatus.OK).send({ message: this.message.get, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Put(`update/by-id/:_id`)
  @UsePipes(ValidationPipe)
  async alterarJogadorPorId(
    @Res() res,
    @Req() Req,
    @Param('_id') _id: string,
    @Body() body: AtualizarCategoriaDto,
  ): Promise<void> {
    return await this.categoriasService
      .updateCategoriaById(_id, body)
      .then((data) => {
        res.status(HttpStatus.OK).send({ message: this.message.put, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Put(`update/by-name/:categoria`)
  // @UsePipes(ValidationPipe)
  async alterarCategoriaPorNome(
    @Res() res,
    @Req() req,
    @Param('categoria') categoria: string,
    @Body() body: AtualizarCategoriaDto,
  ): Promise<void> {
    console.log('touch: alterarCategoriaPorNome');

    return await this.categoriasService
      .updateCategoriaByName(categoria, body)
      .then((data) => {
        res.status(HttpStatus.OK).send({ message: this.message.put, data });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
  @Delete('delete/:_id')
  async removerCategoriaPorId(@Res() res, @Param('_id') _id: string) {
    return this.categoriasService
      .deleteCategoriaById(_id)
      .then((data) => {
        return res
          .status(HttpStatus.OK)
          .send({ message: this.message.delete, data });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Post('categoria/:categoria/jogador/:idJogador')
  async AdicionarJogadorACategoria(
    @Param() params: string[],
    @Res() res,
    @Req() req,
  ) {
    // return console.log(1);

    return this.categoriasService
      .addJogadorCategoria(params, req)
      .then((data) => {
        res.status(HttpStatus.OK).send({
          message: 'Jogador atribuido a categoria com sucesso',
          data: [data],
        });
      })
      .catch((err) => {
        throw new BadRequestException(`${err}`);
      });
  }
}
