import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactRelations1742422776288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE common.emails (
                id               SERIAL    PRIMARY KEY,
                email            VARCHAR   NOT NULL,
                created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at       TIMESTAMP DEFAULT NULL,
                user_fk          INTEGER REFERENCES user_management.users(id) ON DELETE CASCADE,
                establishment_fk INTEGER REFERENCES product_management.establishments(id) ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE common.phones (
                id                      SERIAL     PRIMARY KEY,
                country_code            VARCHAR(3) NOT NULL,
                ddd                     VARCHAR(2) NOT NULL,
                number                  VARCHAR(9) NOT NULL,
                created_at              TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
                updated_at              TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
                deleted_at              TIMESTAMP  DEFAULT NULL,
                user_fk          INTEGER REFERENCES user_management.users(id) ON DELETE CASCADE,
                establishment_fk INTEGER REFERENCES product_management.establishments(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE common.emails`);
        await queryRunner.query(`DROP TABLE common.phones`);
    }

}
