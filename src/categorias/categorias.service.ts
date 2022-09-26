import { JogadoresService } from './../jogadores/jogadores.service';
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
    private readonly jogadoresService: JogadoresService,
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
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  public async getById(_id: string): Promise<ICategoria> {
    const queryResult: ICategoria = await this.categoriaModel
      .findOne({ _id })
      .exec();

    if (!queryResult) {
      throw `Não foi encontrada nehuma categoria com o id: ${_id}`;
    }
    return queryResult;
  }

  async updateCategoriaByName(
    categoria: string,
    body: AtualizarCategoriaDto,
  ): Promise<ICategoria | any> {
    categoria = categoria.toUpperCase();
    const categoriaByName: ICategoria[] = await this.categoriaModel
      .where({
        categoria: categoria,
      })
      .exec();

    if (categoriaByName.length === 0) {
      throw new NotAcceptableException(
        `A categoria '${categoria}' ainda não foi criada.`,
      );
    }
    return await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: body })
      .exec();
  }

  public async updateCategoriaById(
    _id: string,
    body: AtualizarCategoriaDto,
  ): Promise<ICategoria | any> {
    const categoriaByID: ICategoria = await this.categoriaModel
      .findById(_id)
      .exec();

    if (!categoriaByID) {
      throw new NotAcceptableException(
        `A categoria de id '${categoriaByID.categoria}' ainda não foi criada.`,
      );
    }
    return await this.categoriaModel
      .findOneAndUpdate({ _id }, { $set: body })
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
      throw `Categoria '${categoria}' não encontrada`;
    }
    return queryResult;
  }

  public async addJogadorCategoria(params: string[], req): Promise<void> {
    // const categoria = params['categoria'];
    // const jogador = params['jogador'];

    const { categoria, idJogador } = req.params;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    const jogadorJaCadastrado = await await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec();

    await this.jogadoresService.consultarJogadorPeloId(idJogador);
    if (categoriaEncontrada) {
      if (!(jogadorJaCadastrado.length > 0)) {
        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel
          .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
          .exec();
        return;
      }
      throw new BadRequestException(
        `Jogador '${idJogador}' já cadastrado na categoria '${categoria}'`,
      );
    }
    throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
  }
}

/*
 public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

*/
