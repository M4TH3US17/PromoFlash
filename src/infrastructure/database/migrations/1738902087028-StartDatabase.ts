import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";
import { SCHEMA } from "../enums/schemas";
import { Status } from "src/shared/enums/status";

export class StartDatabase1738902087028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            console.log(`[StartDatabase1738902087028] Criando o schema "${SCHEMA.COMMON}"`);
            await queryRunner.createSchema(SCHEMA.COMMON, true);

            console.log(`[StartDatabase1738902087028] Criando o schema "${SCHEMA.PRODUCT}"`);
            await queryRunner.createSchema(SCHEMA.PRODUCT, true);

            console.log(`[StartDatabase1738902087028] Criando o schema "${SCHEMA.PROMOTION}"`);
            await queryRunner.createSchema(SCHEMA.PROMOTION, true);

            console.log(`[StartDatabase1738902087028] Criando o schema "${SCHEMA.USER}"`);
            await queryRunner.createSchema(SCHEMA.USER, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "addresses"`);
            await queryRunner.createTable(new Table({
                schema: SCHEMA.COMMON,
                name: "addresses",
                columns: [
                    new TableColumn({
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "updated_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "street",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "number",
                        type: "int",
                    }),
                    new TableColumn({
                        name: "neighborhood",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "city",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "state",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "cep",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "country",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "complement",
                        type: "varchar",
                    }),
                    /*new TableColumn({
                        name: "location_id",
                        type: "uuid",
                    }),
                    new TableColumn({
                        name: "user_id",
                        type: "uuid",
                    }),
                    new TableColumn({
                        name: "establishment_id",
                        type: "uuid",
                    }),
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["location_id"],
                        referencedTableName: "locations",
                        referencedColumnNames: ["id"],
                    }),
                    new TableForeignKey({
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                    }),
                    new TableForeignKey({
                        columnNames: ["establishment_id"],
                        referencedTableName: "establishments",
                        referencedColumnNames: ["id"],
                    }),*/
                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "contacts"`);
            await queryRunner.createTable(new Table({
                schema: SCHEMA.COMMON,
                name: "contacts",
                columns: [
                    new TableColumn({
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "updated_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "email",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "first_contact",
                        type: "varchar",
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: "second_contact",
                        type: "varchar",
                        isNullable: true,
                    }),
                    /*new TableColumn({
                        name: "user_id",
                        type: "uuid",
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: "establishment_id",
                        type: "uuid",
                        isNullable: true,
                    }),
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["user_id"],
                        referencedTableName: "users", 
                        referencedColumnNames: ["id"],
                    }),
                    new TableForeignKey({
                        columnNames: ["establishment_id"],
                        referencedTableName: "establishments",
                        referencedColumnNames: ["id"],
                    }),*/
                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "coupons"`);
            await queryRunner.createTable(new Table({
                schema: SCHEMA.PROMOTION,
                name: "coupons",
                columns: [
                    new TableColumn({
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "updated_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "status",
                        type: "enum",
                        enum: Object.values(Status),
                        default: Status.ACTIVE,
                    }),
                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "establishments"`);
            await queryRunner.createTable(new Table({
                schema: SCHEMA.PRODUCT,
                name: "establishments",
                columns: [
                    new TableColumn({
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    }),
                    new TableColumn({
                        name: "created_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "updated_at",
                        type: "timestamp",
                        default: () => 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: "cnpj",
                        type: "varchar",
                        isUnique: true,  // A coluna 'cnpj' deve ser única
                    }),
                    new TableColumn({
                        name: "name",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "description",
                        type: "varchar",
                    }),
                    new TableColumn({
                        name: "status",
                        type: "enum",
                        enum: Object.values(Status),
                        default: Status.ACTIVE,
                    }),
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["contact_fk"],
                        referencedTableName: "contacts",
                        referencedColumnNames: ["id"],
                        //constraintName: "fk_establishment_contact",
                    }),
                    new TableForeignKey({
                        columnNames: ["address_fk"],
                        referencedTableName: "addresses",
                        referencedColumnNames: ["id"],
                        //constraintName: "fk_establishment_address",
                    }),
                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "products"`);
            await queryRunner.createTable(new Table({
                schema: SCHEMA.PRODUCT, 
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: () => 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: () => 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'brand',
                        type: 'varchar',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(Status),
                        default: Status.ACTIVE,
                    },
                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "promotions"`);
            await queryRunner.createTable(
                new Table({
                    name: "promotions",
                    schema: "promotion",  // Ajuste o schema conforme necessário
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP",
                        },
                        {
                            name: "title",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "text",
                            isNullable: false,
                        },
                        {
                            name: "status",
                            type: "enum",
                            enum: ["1", "0"],  // Baseado na enum Status
                            default: "'1'",  // Status.ACTIVE
                        },
                        {
                            name: "establishment_fk",
                            type: "int",
                            isNullable: false,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["establishment_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "establishments",
                            onDelete: "CASCADE",
                            name: "fk_promotions_establishment",
                        },
                    ],
                })
            );

            console.log(`[StartDatabase1738902087028] Criando tabela "promotion_products"`);
            await queryRunner.createTable(
                new Table({
                    name: "promotion_products",
                    schema: "promotion",
                    columns: [
                        {
                            name: "promotion_fk",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "product_fk",
                            type: "int",
                            isPrimary: true,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["promotion_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "promotions",
                            onDelete: "CASCADE",
                            name: "fk_promotion_products_promotion",
                        },
                        {
                            columnNames: ["product_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "products",
                            onDelete: "CASCADE",
                            name: "fk_promotion_products_product",
                        }
                    ],
                })
            );

            console.log(`[StartDatabase1738902087028] Criando tabela "users"`);
            await queryRunner.createTable(
                new Table({
                    name: "users",
                    schema: "user",  // Ajuste o schema conforme necessário
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP",
                        },
                        {
                            name: "username",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "password",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "role",
                            type: "enum",
                            enum: ["USER", "ADMIN"],  // Baseado na enum UserRole
                            default: "'USER'",  // UserRole.USER
                        },
                        {
                            name: "status",
                            type: "enum",
                            enum: ["1", "0"],  // Baseado na enum Status
                            default: "'1'",  // Status.ACTIVE
                        },
                        {
                            name: "contact_fk",
                            type: "int",
                            isNullable: true,  // A chave estrangeira é nullable
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["contact_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "contacts",  // Ajuste conforme o nome correto da tabela "contacts"
                            onDelete: "CASCADE",
                            name: "fk_user_contact",
                        }
                    ],
                })
            );
    
            console.log(`[StartDatabase1738902087028] Criando tabela "user_addresses"`);
            await queryRunner.createTable(
                new Table({
                    name: "user_addresses",
                    schema: "user",  // Ajuste o schema conforme necessário
                    columns: [
                        {
                            name: "user_fk",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "address_fk",
                            type: "int",
                            isPrimary: true,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["user_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "users",
                            onDelete: "CASCADE",
                            name: "fk_user_addresses_user",
                        },
                        {
                            columnNames: ["address_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "addresses",  // Ajuste conforme o nome correto da tabela "addresses"
                            onDelete: "CASCADE",
                            name: "fk_user_addresses_address",
                        }
                    ],
                })
            );
    
            console.log(`[StartDatabase1738902087028] Criando tabela "user_establishments"`);
            await queryRunner.createTable(
                new Table({
                    name: "user_establishments",
                    schema: "user",  // Ajuste o schema conforme necessário
                    columns: [
                        {
                            name: "user_fk",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "establishments_fk",
                            type: "int",
                            isPrimary: true,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["user_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "users",
                            onDelete: "CASCADE",
                            name: "fk_user_establishments_user",
                        },
                        {
                            columnNames: ["establishments_fk"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "establishments",  // Ajuste conforme o nome correto da tabela "establishments"
                            onDelete: "CASCADE",
                            name: "fk_user_establishments_establishment",
                        }
                    ],
                })
            );

            /*console.log(`[StartDatabase1738902087028] Criando tabela "establishments_customers"`);
            await queryRunner.createTable(new Table({
                name: "establishments_customers",
                columns: [

                ],
            }), true, true);

            console.log(`[StartDatabase1738902087028] Criando tabela "establishments_products"`);
            await queryRunner.createTable(new Table({
                name: "establishments_products",
                columns: [

                ],
            }), true, true);*/

        } catch (error) {
            console.error('[StartDatabase1738902087028] Erro ao criar schemas:', error);
        }
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            console.log(`[StartDatabase1738902087028] Deletando o esquema "${SCHEMA.COMMON}"`);
            await queryRunner.dropSchema(SCHEMA.COMMON, true, true);

            console.log(`[StartDatabase1738902087028] Deletando o esquema "${SCHEMA.PRODUCT}"`);
            await queryRunner.dropSchema(SCHEMA.PRODUCT, true, true);

            console.log(`[StartDatabase1738902087028] Deletando o esquema "${SCHEMA.PROMOTION}"`);
            await queryRunner.dropSchema(SCHEMA.PROMOTION, true, true);

            console.log(`[StartDatabase1738902087028] Deletando o esquema "${SCHEMA.USER}"`);
            await queryRunner.dropSchema(SCHEMA.USER, true, true);

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

        } catch (error) {
            console.error('[StartDatabase1738902087028] Erro ao deletar schemas:', error);
        }
    };

};