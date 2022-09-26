import { StatusDesafio } from './../enums/status-desafio.enum';
import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';

export class AlterarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dtDesafio: Date;

  @IsNotEmpty()
  @IsIn(['ACEITO', 'RECUSADO', 'CANCELADO'])
  status: StatusDesafio;
}
