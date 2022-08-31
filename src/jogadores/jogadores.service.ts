import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly Logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<any> {
    // const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      // return await this.atualizar(criarJogadorDto);
      throw new NotFoundException(`Jogador com o id: '${_id}' não encontrado`);
    }
    // this.criar(criarJogadorDto);
    return await this.jogadorModel
      .updateOne({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async criarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IJogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return jogadorCriado.save();
  }

  async deleteByEmail(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return this.jogadorModel.deleteOne({ _id }).exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<IJogador | string> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }
}
