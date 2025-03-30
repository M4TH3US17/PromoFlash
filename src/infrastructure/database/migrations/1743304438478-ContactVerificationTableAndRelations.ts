import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactVerificationTableAndRelations1743304438478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TYPE common.contact_type AS ENUM ('SMS', 'EMAIL');
            CREATE TYPE common.owner_type AS ENUM ('USER', 'ESTABLISHMENT');
            CREATE TYPE common.token_type AS ENUM ('RECOVERY', 'CONFIRMATION');

            CREATE TABLE common.contact_verification (
                id           SERIAL,
                token        INTEGER               NOT NULL,
                expired_at   TIMESTAMP             NOT NULL,
                used_at      TIMESTAMP             NOT NULL,
                contact_type common.contact_type   NOT NULL DEFAULT 'SMS',
                owner_type   common.owner_type     NOT NULL DEFAULT 'ESTABLISHMENT',
                token_type   common.token_type     NOT NULL DEFAULT 'CONFIRMATION',
                user_fk      INT                   NOT NULL,
                created_at   TIMESTAMP DEFAULT     CURRENT_TIMESTAMP,
                updated_at   TIMESTAMP DEFAULT     CURRENT_TIMESTAMP,
                deleted_at   TIMESTAMP DEFAULT     NULL
            );    
        `);

        // CREATE TABLE common.phones (
        //     id               SERIAL,
        //     country_code     VARCHAR(3) NOT NULL,
        //     ddd              VARCHAR(2) NOT NULL,
        //     number           VARCHAR(9) NOT NULL,
        //     user_fk          INT NULL,
        //     establishment_fk INT NULL,
        //     created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //     updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //     deleted_at       TIMESTAMP DEFAULT NULL
        // );

        // CREATE TABLE common.emails (
        //     id               SERIAL,
        //     email            VARCHAR NOT NULL,
        //     user_fk          INT NULL,
        //     establishment_fk INT NULL,
        //     created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //     updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //     deleted_at       TIMESTAMP DEFAULT NULL
        // );

        // await queryRunner.query(`ALTER TABLE common.phones ADD CONSTRAINT pk_phones PRIMARY KEY (id)`);
        // await queryRunner.query(`ALTER TABLE common.emails ADD CONSTRAINT pk_emails PRIMARY KEY (id)`);
        await queryRunner.query(`ALTER TABLE common.contact_verification ADD CONSTRAINT pk_contact_verification PRIMARY KEY (id)`);

        // await queryRunner.query(`ALTER TABLE common.phones ADD CONSTRAINT fk_phone_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE SET NULL`);
        // await queryRunner.query(`ALTER TABLE common.phones ADD CONSTRAINT fk_phone_establishment FOREIGN KEY (establishment_fk) REFERENCES product_management.establishments (id) ON DELETE SET NULL`);
        // await queryRunner.query(`ALTER TABLE common.emails ADD CONSTRAINT fk_email_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE SET NULL`);
        // await queryRunner.query(`ALTER TABLE common.emails ADD CONSTRAINT fk_email_establishment FOREIGN KEY (establishment_fk) REFERENCES product_management.establishments (id) ON DELETE SET NULL`);
        await queryRunner.query(`ALTER TABLE common.contact_verification ADD CONSTRAINT fk_contact_veri_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first
        // await queryRunner.query(`ALTER TABLE common.contact_verification DROP CONSTRAINT IF EXISTS fk_contact_veri_user`);
        // await queryRunner.query(`ALTER TABLE common.emails DROP CONSTRAINT IF EXISTS fk_email_establishment`);
        // await queryRunner.query(`ALTER TABLE common.emails DROP CONSTRAINT IF EXISTS fk_email_user`);
        // await queryRunner.query(`ALTER TABLE common.phones DROP CONSTRAINT IF EXISTS fk_phone_establishment`);
        // await queryRunner.query(`ALTER TABLE common.phones DROP CONSTRAINT IF EXISTS fk_phone_user`);

        // Drop primary key constraints
        await queryRunner.query(`ALTER TABLE common.contact_verification DROP CONSTRAINT IF EXISTS pk_contact_verification`);
        // await queryRunner.query(`ALTER TABLE common.emails DROP CONSTRAINT IF EXISTS pk_emails`);
        // await queryRunner.query(`ALTER TABLE common.phones DROP CONSTRAINT IF EXISTS pk_phones`);

        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS common.contact_verification`);
        // await queryRunner.query(`DROP TABLE IF EXISTS common.emails`);
        // await queryRunner.query(`DROP TABLE IF EXISTS common.phones`);

        // Drop enum types
        await queryRunner.query(`DROP TYPE IF EXISTS common.token_type`);
        await queryRunner.query(`DROP TYPE IF EXISTS common.owner_type`);
        await queryRunner.query(`DROP TYPE IF EXISTS common.contact_type`);
    }

}
