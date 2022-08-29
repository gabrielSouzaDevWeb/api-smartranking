import { IJogador } from './interfaces/jogador.interface';
import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly Logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<any> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel
      .findOne({ email: email })
      .exec();

    if (jogadorEncontrado) {
      // return await this.atualizar(criarJogadorDto);
    }
    this.criar(criarJogadorDto);
    return;
  }

  public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return jogadorCriado.save();
  }

  public async atualizarJogador(
    criarJogadorDto: CriarJogadorDto,
    _id: string,
  ): Promise<any> {
    return await this.jogadorModel
      .updateOne({ _id }, { $set: criarJogadorDto })
      .exec();
  }

  async deleteByEmail(email: string): Promise<any> {
    return this.jogadorModel.deleteOne({ email }).exec();
  }
  async getJogadorPorId(_id: string): Promise<IJogador | string> {
    return this.jogadorModel.findOne({ _id }).exec();
  }
}
