import { IJogador } from './../interfaces/jogador.interface';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  async criarAtualizaJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEcontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    jogadorEcontrado
      ? await this.atualizarJogador(jogadorEcontrado, criarJogadorDto)
      : await this.criarJogador(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadores;
  }

  private criarJogador(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto;
    const jogador: IJogador = {
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  async atualizarJogador(
    jogadorEncontrado: CriarJogadorDto,
    novoJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const { nome } = novoJogadorDto;
    jogadorEncontrado.nome = nome;
  }

  async consultarJogadorPeloEmail(email: string): Promise<IJogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.logger.log(jogadorEncontrado);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(query: string): Promise<void> {
    console.log(4, query);
    console.log(5, this.jogadores);
    console.log(6, this.jogadores[this.jogadores.length - 1].email);

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === query,
    );
    console.log(7, jogadorEncontrado);

    this.jogadores = this.jogadores.filter((jogador) => {
      return jogador.email !== jogadorEncontrado.email;
    });
    console.log(this.jogadores);
  }
}
