import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShortUrlsTableMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Caso você utilize o tipo UUID (por exemplo, para a referência do usuário), cria a extensão
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
      CREATE TABLE short_urls (
        code varchar(6) NOT NULL,
        "originalUrl" varchar NOT NULL,
        "userId" uuid NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "updatedAt" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT pk_short_urls PRIMARY KEY (code)
      );
    `);

    await queryRunner.query(`
      ALTER TABLE short_urls
      ADD CONSTRAINT fk_short_urls_user
      FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS short_urls;`);
  }
}
