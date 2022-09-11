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
import { resolve } from 'path';
import { rejects } from 'assert';

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
      throw `Não foi encontrada nehuma categoria com o nome: ${_id}`;
    }
    return queryResult;
  }

  public async updateCategoriaByCategoria(
    categoria: string,
    body: AtualizarCategoriaDto,
  ): Promise<ICategoria | any> {
    const categoriaByID: ICategoria = await this.categoriaModel
      .findById(categoria)
      .exec();

    if (!categoriaByID) {
      throw new NotAcceptableException(
        `A categoria '${categoriaByID.categoria}' ainda não foi criada.`,
      );
    }
    return await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: body })
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

  public async addJogadorCategoria(params: string[], req): Promise<void> {
    // const categoria = params['categoria'];
    // const jogador = params['jogador'];
    const { categoria, idJogador } = req.params;

    await this.categoriaModel
      .findOne({ categoria })
      .exec()
      .then(async (categoriaEncontrada: ICategoria) => {
        //to-do: verificar se o joagdor está cadastrada
        if (categoriaEncontrada) {
          //const jogadorJaCadastradoCategoria =
          await this.categoriaModel
            .find({ categoria })
            .where('jogadores')
            .in(idJogador)
            .exec()
            .then(async (jogadorJaCadastradoCategoria) => {
              if (
                jogadorJaCadastradoCategoria &&
                !(jogadorJaCadastradoCategoria.length > 0)
              ) {
                //inverter os blocos com a condição (jogador.length > 0)
                return await this.categoriaModel
                  .findOneAndUpdate(
                    { categoria },
                    { $set: categoriaEncontrada },
                  )
                  .exec()
                  .catch((err) => {
                    throw new Error(
                      `Não foi possível atualizar a categoria '${categoria}' com o jogador de id ${idJogador}`,
                    );
                  });
              }
              throw new Error(
                `Jogador '${idJogador}' já cadastrado na categoria '${categoria}'`,
              );
            });
          // .catch((err) => {
          //   throw new BadRequestException(
          //     `Jogador ${idJogador} não encontrado`,
          //   );
          // });
        }
      })
      .catch((err) => {
        // throw new BadRequestException(
        //   `Categoria '${categoria}' não encontrada`,
        // );
      });
  }
}

/*
 public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

*/
