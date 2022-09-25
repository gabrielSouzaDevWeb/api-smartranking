import { IJogador } from './../../jogadores/interfaces/jogador.interface';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dtDesafio: Date;

  @IsNotEmpty()
  solicitante: IJogador;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  jogadores: Array<IJogador>;
}
