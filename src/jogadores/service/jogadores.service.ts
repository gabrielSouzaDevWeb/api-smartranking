import { IJogador } from './../interfaces/jogador.interface';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  // async criarAtualizaJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
  //   const { email } = criarJogadorDto;
  //   const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

  // jogadorEncontrado
  //   ? await this.atualizarJogador(criarJogadorDto)
  //   : await this.criarJogador(criarJogadorDto);
  // }

  async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async criarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IJogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    novoJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com o ${_id} não encontrado`);
    }
    await this.jogadorModel
      .findOneAndUpdate(
        { email: novoJogadorDto.email },
        { $set: novoJogadorDto },
      )
      .exec();
  }

  async consultarJogadorPeloId(email: string): Promise<IJogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }
}
