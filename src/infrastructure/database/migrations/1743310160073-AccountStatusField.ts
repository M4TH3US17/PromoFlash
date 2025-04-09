import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountStatusField1743310160073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TYPE common.account_status AS ENUM (
                'PENDING',
                'ACTIVE',
                'INACTIVE',
                'SUSPENDED',
                'BANNED',
                'UNDER_REVIEW',
                'LOCKED',
                'DELETED'
            );
            
            ALTER TABLE user_management.users ADD COLUMN IF NOT EXISTS account_status common.account_status NOT NULL DEFAULT 'PENDING';
            ALTER TABLE product_management.establishments ADD COLUMN IF NOT EXISTS status common.account_status NOT NULL DEFAULT 'PENDING';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove columns first
        await queryRunner.query(`
            ALTER TABLE user_management.users DROP COLUMN IF EXISTS account_status;
            ALTER TABLE product_management.establishments DROP COLUMN IF EXISTS status;
        `);

        // Then drop the enum type
        await queryRunner.query(`
            DROP TYPE IF EXISTS common.account_status;
        `);
    }
}
