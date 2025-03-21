import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { SCHEMA } from "../enums/schemas";

export class StartDatabase1738902087028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(`[StartDatabase1738902087028] Criando os schemas`);
        await queryRunner.query(`
                CREATE SCHEMA IF NOT EXISTS ${SCHEMA.COMMON};
                CREATE SCHEMA IF NOT EXISTS ${SCHEMA.USER};
                CREATE SCHEMA IF NOT EXISTS ${SCHEMA.PRODUCT};
                CREATE SCHEMA IF NOT EXISTS ${SCHEMA.PROMOTION};
            `);

        console.log(`\n[StartDatabase1738902087028] Criando os ENUMS`);
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
                    CREATE TYPE common.status AS ENUM ('ACTIVE', 'INACTIVE'); 
                END IF;
            END $$;`);

        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_category') THEN
                    CREATE TYPE product_management.product_category AS ENUM ('DRINKS', 'OTHER'); 
                END IF;
            END $$;`);

            await queryRunner.query(`
                CREATE TYPE product_management.establishment_type AS ENUM (
                    'HEADQUARTERS', 
                    'SUB_HEADQUARTERS', 
                    'BRANCH', 
                    'FRANCHISE'
                );`);
                
        // await queryRunner.query(`
        // CREATE TYPE product_management.establishment_validate_status AS ENUM (
        //     '0', -- Não confiável (informações insuficientes ou inválidas)
        //     '1', -- Válido (informações verificadas e confirmadas)
        //     '2'  -- Em análise (pendente de verificação ou validação)
        // );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "addresses"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS common.addresses (
                id                 SERIAL,
                street             VARCHAR(255) NOT NULL,
                number             INT          NOT NULL,
                neighborhood       VARCHAR(255) NOT NULL,
                deleted_at TIMESTAMP    DEFAULT NULL,
                city               VARCHAR(255) NOT NULL,
                state              VARCHAR(255) NOT NULL,
                cep                VARCHAR(20)  NOT NULL,
                country            VARCHAR(255) NOT NULL,
                complement         VARCHAR(255),
                location_latitude  DECIMAL(10, 8),
                location_longitude DECIMAL(11, 8),
                created_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "contacts"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS common.contacts (
                id               SERIAL,
                email            VARCHAR(255) NOT NULL,
                first_contact    VARCHAR(50)  NOT NULL,
                deleted_at TIMESTAMP    DEFAULT NULL,
                second_contact   VARCHAR(50),
                created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "coupons"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS promotion_management.coupons (
                id     SERIAL,
                status common.status NOT NULL DEFAULT 'ACTIVE',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "establishments"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_management.establishments (
                id             SERIAL,
                created_at     TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at     TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP NOT NULL,
                cnpj           VARCHAR                             NOT NULL,
                business_name  VARCHAR,
                deleted_at     TIMESTAMP                           DEFAULT NULL,
                name           VARCHAR                             NOT NULL,
                description    VARCHAR                             NOT NULL,
                stars          INT                                 NOT NULL,
                is_verified    INT                                 DEFAULT 0,
                main_fk        INT                                 DEFAULT NULL,
                contact_fk     INT                                 UNIQUE,
                address_fk     INT                                 UNIQUE,
                establishment_type                                 product_management.establishment_type DEFAULT 'HEADQUARTERS' NOT NULL,
                establishment_validate_status                      INT DEFAULT 0 NOT NULL
                --establishment_validate_status                      product_management.establishment_validate_status DEFAULT '0' NOT NULL
            );

            --COMMENT ON COLUMN product_management.establishments.is_verified Status de verificação da filial, conforme determinado pela loja matriz. 1 indica que a filial foi validada pela matriz, enquanto 0 significa que a filial ainda não foi validada.
           -- COMMENT ON COLUMN product_management.establishments.main_fk IS "ID do estabelecimento matriz. Se preenchido, indica que a entidade atual é uma filial vinculada à loja matriz.";
            `);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "products"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_management.products (
                id         SERIAL,
                created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
                deleted_at TIMESTAMP    DEFAULT NULL,
                name       VARCHAR       NOT NULL,
                brand      VARCHAR       NOT NULL,
                status     common.status NOT NULL DEFAULT 'ACTIVE'
            );    
            `);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "promotions"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS promotion_management.promotions (
                id               SERIAL,
                created_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP NOT NULL,
                deleted_at TIMESTAMP    DEFAULT NULL,
                title            VARCHAR(255)  NOT NULL,
                description      TEXT          NOT NULL,
                status           common.status NOT NULL DEFAULT 'ACTIVE',
                establishment_fk INT           NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "promotion_products"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS promotion_management.promotion_products (
                promotion_fk INT NOT NULL,
                product_fk   INT NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "users"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_management.users (
                id         SERIAL,
                created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP    DEFAULT NULL,
                username   VARCHAR(255) NOT NULL,
                password   VARCHAR(255) NOT NULL,
                role       VARCHAR(255) CHECK (role IN ('USER', 'ADMIN')) DEFAULT 'USER',
                status     common.status NOT NULL DEFAULT 'ACTIVE',
                contact_fk INT
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "user_addresses"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_management.user_addresses (
                user_fk    INT NOT NULL,
                address_fk INT NOT NULL
            );`);

        console.log(`\n[StartDatabase1738902087028] Criando tabela "user_establishments"`);
        await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS user_management.user_establishments (
                user_fk           INT NOT NULL,
                establishments_fk INT NOT NULL
            );`);


        console.log(`[StartDatabase1738902087028] Criando tabela "establishments_customers"`);
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS product_management.establishments_customers (
            user_fk                   INT NOT NULL,
            establishment_fk          INT NOT NULL,
            total_promotions_acquired INT DEFAULT 0,
            following_since           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
 
        console.log(`[StartDatabase1738902087028] Criando tabela "establishments_products"`);
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS product_management.establishments_products (
            establishment_fk INT                                 NOT NULL,
            product_fk       INT                                 NOT NULL,
            price            NUMERIC                             NOT NULL,
            description      TEXT                                NOT NULL,
            stars            INT                                 NOT NULL,
            status           common.status                       NOT NULL DEFAULT 'ACTIVE',
            category         product_management.product_category NOT NULL DEFAULT 'OTHER'
        );`);

        console.log(`\n[StartDatabase1738902087028] Criando CONSTRAINTS das Primary Keys...`);
        await queryRunner.query(`ALTER TABLE common.addresses ADD CONSTRAINT pk_addresses PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE common.contacts ADD CONSTRAINT pk_contacts PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE promotion_management.coupons ADD CONSTRAINT pk_coupons PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE product_management.establishments ADD CONSTRAINT pk_establishments PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE product_management.products ADD CONSTRAINT pk_products PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE promotion_management.promotions ADD CONSTRAINT pk_promotions PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE promotion_management.promotion_products ADD CONSTRAINT pk_promotion_products PRIMARY KEY (promotion_fk, product_fk);`);
        await queryRunner.query(`ALTER TABLE user_management.users ADD CONSTRAINT pk_users PRIMARY KEY (id);`);
        await queryRunner.query(`ALTER TABLE user_management.user_addresses ADD CONSTRAINT pk_user_addresses PRIMARY KEY (user_fk, address_fk);`);
        await queryRunner.query(`ALTER TABLE user_management.user_establishments ADD CONSTRAINT pk_user_establishments PRIMARY KEY (user_fk, establishments_fk);`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_customers ADD CONSTRAINT pk_establishments_customers PRIMARY KEY (user_fk, establishment_fk);`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_products ADD CONSTRAINT pk_establishments_products PRIMARY KEY (establishment_fk, product_fk);`);

        console.log(`\n[StartDatabase1738902087028] Criando CONSTRAINTS das Foreign Keys...`);
        await queryRunner.query(`ALTER TABLE product_management.establishments ADD CONSTRAINT fk_establishment_contact FOREIGN KEY (contact_fk) REFERENCES common.contacts (id) ON DELETE SET NULL`);
        await queryRunner.query(`ALTER TABLE product_management.establishments ADD CONSTRAINT fk_establishment_address FOREIGN KEY (address_fk) REFERENCES common.addresses (id) ON DELETE SET NULL`);
        await queryRunner.query(`ALTER TABLE promotion_management.promotions ADD CONSTRAINT fk_promotions_establishment FOREIGN KEY (establishment_fk) REFERENCES product_management.establishments (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE promotion_management.promotion_products ADD CONSTRAINT fk_promotion_products_promotion FOREIGN KEY (promotion_fk) REFERENCES promotion_management.promotions (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE promotion_management.promotion_products ADD CONSTRAINT fk_promotion_products_product FOREIGN KEY (product_fk) REFERENCES product_management.products (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE user_management.users ADD CONSTRAINT fk_user_contact FOREIGN KEY (contact_fk) REFERENCES common.contacts (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE user_management.user_addresses ADD CONSTRAINT fk_user_addresses_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE user_management.user_addresses ADD CONSTRAINT fk_user_addresses_address FOREIGN KEY (address_fk) REFERENCES common.addresses (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE user_management.user_establishments ADD CONSTRAINT fk_user_establishments_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE user_management.user_establishments ADD CONSTRAINT fk_user_establishments_establishment FOREIGN KEY (establishments_fk) REFERENCES product_management.establishments (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_customers ADD CONSTRAINT fk_establishments_customers_user FOREIGN KEY (user_fk) REFERENCES user_management.users (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_customers ADD CONSTRAINT fk_establishments_customers_establishment FOREIGN KEY (establishment_fk) REFERENCES product_management.establishments (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_products ADD CONSTRAINT fk_establishments_products_establishment FOREIGN KEY (establishment_fk) REFERENCES product_management.establishments (id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE product_management.establishments_products ADD CONSTRAINT fk_establishments_products_product FOREIGN KEY (product_fk) REFERENCES product_management.products (id) ON DELETE CASCADE`);

    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log(`[StartDatabase1738902087028] Deletando o schemas`);
        await queryRunner.query(`
                DROP SCHEMA IF EXISTS ${SCHEMA.PROMOTION} CASCADE;
                DROP SCHEMA IF EXISTS ${SCHEMA.PRODUCT} CASCADE;
                DROP SCHEMA IF EXISTS ${SCHEMA.USER} CASCADE;
                DROP SCHEMA IF EXISTS ${SCHEMA.COMMON} CASCADE;
            `);

        console.log(`[StartDatabase1738902087028] Deletando tabela "addresses"`);
        await queryRunner.dropTable("addresses", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "contacts"`);
        await queryRunner.dropTable("contacts", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "coupons"`);
        await queryRunner.dropTable("coupons", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "establishments"`);
        await queryRunner.dropTable("establishments", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "products"`);
        await queryRunner.dropTable("products", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "promotion_products"`);
        await queryRunner.dropTable("promotion_products", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "promotions"`);
        await queryRunner.dropTable("promotions", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "user_establishments"`);
        await queryRunner.dropTable("user_establishments", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "user_addresses"`);
        await queryRunner.dropTable("user_addresses", true, true, true);

        console.log(`[StartDatabase1738902087028] Deletando tabela "users"`);
        await queryRunner.dropTable("users", true, true, true);
    };

};