import { IJogador } from './interfaces/jogador.interface';
import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 } from 'uuid';
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
    console.log(email, jogadorEncontrado);

    if (jogadorEncontrado) {
      return await this.atualizar(criarJogadorDto);
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

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }

  async deleteByEmail(email: string): Promise<IJogador[] | IJogador> {
    return this.jogadorModel.findOneAndRemove({ email }).exec();
  }
  async getJogadorPorEmail(email, res): Promise<IJogador | string> {
    return this.jogadorModel.findOne({ email }).exec();
  }
}
