import { ICategoria } from './../categorias/interfaces/categoria.interface';
import { IJogador } from './../jogadores/interfaces/jogador.interface';
import { CriarDesafioDto } from './dtos/desafio.dto';
import { CategoriasService } from './../categorias/categorias.service';
import { JogadoresService } from './../jogadores/jogadores.service';
import { IDesafio } from './interfaces/desafios.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDesafio } from './enums/status-desafio.enum';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private readonly desafioModel: Model<IDesafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriaService: CategoriasService,
  ) {}
  async criarDesafio(body: CriarDesafioDto, req): Promise<void | any> {
    let { solicitante, jogadores } = body;
    const jogadoresEncontrados: Array<IJogador> = [];

    let jogadoresId = jogadores.map((jogador: IJogador) => {
      return jogador._id;
    });

    jogadoresId = [...new Set(jogadoresId)];

    if (!jogadoresId.includes(solicitante._id)) {
      throw new BadRequestException(
        `O jogador solicitante '${JSON.stringify(
          solicitante,
        )} deve participar do desafio!`,
      );
    }

    if (jogadoresId.length === 1) {
      throw new BadRequestException(`Os jogadores devem ser distintos.`);
    }
    for (const [index, jogadorId] of jogadoresId.entries()) {
      let jogadorEncontrado: IJogador =
        await this.jogadoresService.consultarJogadorPeloId(jogadorId);

      if (!jogadorEncontrado) {
        throw new BadRequestException(`Jogador '${jogadorId}' não encontrado!`);
      }
      jogadoresEncontrados.push(jogadorEncontrado);
    }

    const categorias = await this.categoriaService.getAll();
    let categoriaSolicitante: ICategoria;
    categorias.forEach(
      (categoria: ICategoria, index, categorias: ICategoria[]) => {
        let jogadoresId = categoria.jogadores.map((jogador) => {
          return jogador._id.toString();
        });
        if (jogadoresId.includes(solicitante._id)) {
          return (categoriaSolicitante = categoria);
        }
      },
    );
    const prepareBodyToSave = {
      ...body,
      categoria: categoriaSolicitante._id,
      status: StatusDesafio['PENDENTE'],
      dtSolicitacao: new Date(),
    };

    const desafioEncontrado: IDesafio = await this.desafioModel
      .findOne({ prepareBodyToSave })

      .exec();
    if (!desafioEncontrado) {
      return await new this.desafioModel(prepareBodyToSave).save();
    }
    throw new BadRequestException(`Desafio já criado!`);
  }
}
