import { IJogador } from './../../jogadores/interfaces/jogador.interface';
import { Document } from 'mongoose';

export enum DesafioStatus {
  'pendente' = 1,
  'aceito' = 2,
  'recusado' = 3,
}

export interface IDesafios extends Document {
  dtDesafio: Date;
  status: DesafioStatus;
  dtHoraSolicitacao: Date;
  dtResposta: Date;
  solicitante: IJogador;
  categoria: string;
  jogadores: Array<IJogador>;
  partida: IPartida;
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
