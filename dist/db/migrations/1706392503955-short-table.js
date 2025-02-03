"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUrlsTableMigration = void 0;
class ShortUrlsTableMigration {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS short_urls;`);
    }
}
exports.ShortUrlsTableMigration = ShortUrlsTableMigration;
//# sourceMappingURL=1706392503955-short-table.js.map