import { IJogador } from './../interfaces/jogador.interface';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import {
  Injectable,
  Logger,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);
  constructor() {}

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
      id: randomUUID(),
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
    jogadorEcontrado: CriarJogadorDto,
    novoJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const { nome } = novoJogadorDto;
    jogadorEcontrado.nome = nome;
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
}
