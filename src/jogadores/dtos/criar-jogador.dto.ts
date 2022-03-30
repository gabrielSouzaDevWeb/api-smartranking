import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty({ message: 'telefone-celular não informado' })
  telefoneCelular: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email não informado' })
  email: string;

  @IsNotEmpty({ message: 'Nome não informado' })
  nome: string;
}
