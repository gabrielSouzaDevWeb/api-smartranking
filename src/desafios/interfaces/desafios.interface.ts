import { StatusDesafio } from './../enums/status-desafio.enum';
import { IJogador } from './../../jogadores/interfaces/jogador.interface';
import { Document } from 'mongoose';

export interface IDesafio extends Document {
  dtDesafio: Date;
  status: StatusDesafio;
  dtSolicitacao: Date;
  dtResposta?: Date;
  solicitante: IJogador;
  categoria: string;
  jogadores: Array<IJogador>;
  partida?: IPartida;
}

export interface IPartida extends Document {
  categoria: string;
  jogadores: Array<IJogador>;
  def: IJogador;
  resultado: Array<IResultado>;
}

export interface IResultado {
  set: string;
}
