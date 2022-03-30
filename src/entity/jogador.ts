import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class jogador {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'telefoneCelular' })
  telefonecelular: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'ranking' })
  ranking: string;

  @Column({ name: 'posicao_ranking' })
  posicaoRanking: string;

  @Column({ name: 'data_cricao' })
  dataCriacao: Date;

  @Column({ name: 'data_atualizacao' })
  dataAtualizacao: Date;
}
