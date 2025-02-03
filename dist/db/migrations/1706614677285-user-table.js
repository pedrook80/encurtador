"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable1706614677285 = void 0;
class UserTable1706614677285 {
    async up(queryRunner) {
        queryRunner.query(`CREATE TABLE "user" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            username varchar(256) NOT NULL,
            password_hash varchar(256) NOT NULL,
            CONSTRAINT user_pk_id PRIMARY KEY (id),
            CONSTRAINT user_un_username UNIQUE (username)
        );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }
}
exports.UserTable1706614677285 = UserTable1706614677285;
//# sourceMappingURL=1706614677285-user-table.js.map