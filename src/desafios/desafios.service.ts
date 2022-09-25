import { ICategoria } from './../categorias/interfaces/categoria.interface';
import { IJogador } from './../jogadores/interfaces/jogador.interface';
import { CriarDesafioDto } from './dtos/desafio.dto';
import { CategoriasService } from './../categorias/categorias.service';
import { JogadoresService } from './../jogadores/jogadores.service';
import { IDesafios } from './interfaces/desafios.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private readonly desafioModel: Model<IDesafios>,
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
    // console.log(categoriaSolicitante);
    categorias.forEach(
      (categoria: ICategoria, index, categorias: ICategoria[]) => {
        // if(categoria.jogadores.includes())
        let jogadoresId = categoria.jogadores.map((jogador) => {
          return jogador._id;
        });
        console.log(jogadoresId);
        console.log(categoria.jogadores);

        if (jogadoresId.includes(solicitante._id)) {
          categoriaSolicitante = categoria;
        }
        // categoria.jogadores.forEach(
        //   (jogador: IJogador, index, jogadores: IJogador[]) => {},
        // );
      },
    );
    // console.log('SELECT categoria FROM categorias WHERE jogador = solicitante._id');
    console.log(68, 'categoriaSolicitante', categoriaSolicitante);

    // console.log(50, 'categorais', categorias[0].jogadores);

    // console.log(48, 'jogadoresEncontrados', jogadoresEncontrados);
    // console.log(49, 'solicitante', solicitante);

    // const {};
    return body;
    const desafioEncontrado: IDesafios = await this.desafioModel
      .findOne({ body })
      .exec();
    if (!desafioEncontrado) {
      await new this.desafioModel(body).save();
      return;
    }
    throw new BadRequestException(`Desafio já criado!`);
  }
}
