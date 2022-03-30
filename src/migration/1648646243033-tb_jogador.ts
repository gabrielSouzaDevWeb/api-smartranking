import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class tbJogador1648646243033 implements MigrationInterface {
  private tableName = 'jogador';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'telefonecelular',
            type: 'varchar(16)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'nome',
            type: 'varchar(32)',
            isNullable: true,
          },
          {
            name: 'ranking',
            type: 'varchar(8)',
            isNullable: true,
          },
          {
            name: 'posicao_ranking',
            type: 'varchar(16)',
            isNullable: true,
          },
          {
            name: 'data_criacao',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'data_alteracao',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
