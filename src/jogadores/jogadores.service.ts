import { IJogador } from './interfaces/jogador.interface';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
      throw new BadRequestException(
        `jogador com e-mail '${email}' já cadastrado`,
      );
    }

    return await this.criarJogador(criarJogadorDto);
  }

  public async getAll(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  private async criarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IJogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  public async atualizarJogador(
    criarJogadorDto: CriarJogadorDto,
    _id: string,
  ): Promise<any> {
    await this.getJogadorPorId(_id)
      .then(async (data) => {
        return await this.jogadorModel
          .updateOne({ _id }, { $set: criarJogadorDto })
          .exec();
      })
      .catch((err) => {
        throw new NotFoundException(`Jogador com ${_id} não encontrado`, err);
      });
  }

  async deleteByEmail(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }
  async getJogadorPorId(_id: string): Promise<IJogador | string> {
    return await this.jogadorModel.findOne({ _id }).exec();
  }
}
