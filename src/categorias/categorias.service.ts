import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { ICategoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<ICategoria>,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<ICategoria> {
    const { categoria } = criarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw `A categoria: '${categoria}' já foi criada!`;
    }
    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  public async getAll(): Promise<ICategoria[]> {
    return await this.categoriaModel.find().exec();
  }

  public async getById(_id: string): Promise<ICategoria> {
    const queryResult: ICategoria = await this.categoriaModel
      .findOne({ _id })
      .exec();

    if (!queryResult) {
      throw `Não foi encontrada nehuma categoria com o nome: ${_id}`;
    }
    return queryResult;
  }

  public async updateCategoriaById(
    categoria: string,
    body: AtualizarCategoriaDto,
  ): Promise<ICategoria | any> {
    const categoriaByID: ICategoria = await this.categoriaModel
      .findById(categoria)
      .exec();

    if (!categoriaByID) {
      throw `A categoria '${categoriaByID.categoria}' ainda não foi criada.`;
    }
    return await this.categoriaModel
      .updateOne({ categoria }, { $set: body })
      .exec();
  }

  public async deleteCategoriaById(_id: string): Promise<any> {
    const queryResult = await this.categoriaModel.findOne({ _id }).exec();

    if (!queryResult) {
      throw `Não foi encontrada nehuma categoria com o id: ${_id}`;
    }
    return await this.categoriaModel.deleteOne({ _id }).exec();
  }

  public async getCategoria(categoria: string): Promise<ICategoria> {
    const queryResult: ICategoria = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!queryResult) {
      throw `Não foi encontrada nehuma categoria com o id: ${categoria}`;
    }
    return queryResult;
  }
}

/*
 public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

*/
