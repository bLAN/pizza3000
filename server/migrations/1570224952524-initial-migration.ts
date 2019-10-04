import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1570224952524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`create table typeorm_metadata
(
    type     varchar not null,
    database varchar,
    schema   varchar,
    "table"  varchar,
    name     varchar,
    value    text
)`, undefined);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "order_status_enum" AS ENUM('0', '1', '2', '3')`, undefined);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerName" character varying NOT NULL, "status" "order_status_enum" NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "itemId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_17bc913318f66c5407847c1bfdd" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`CREATE VIEW "item_with_availability" AS SELECT item.* AS "id", COUNT("item"."id") AS "sold" FROM "item" "item" LEFT JOIN "order" "orders" ON orders."itemId" = "item"."id" GROUP BY "item"."id"`, undefined);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","item_with_availability","SELECT item.* AS \"id\", COUNT(\"item\".\"id\") AS \"sold\" FROM \"item\" \"item\" LEFT JOIN \"order\" \"orders\" ON orders.\"itemId\" = \"item\".\"id\" GROUP BY \"item\".\"id\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","item_with_availability"]);
        await queryRunner.query(`DROP VIEW "item_with_availability"`, undefined);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_17bc913318f66c5407847c1bfdd"`, undefined);
        await queryRunner.query(`DROP TABLE "order"`, undefined);
        await queryRunner.query(`DROP TYPE "order_status_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "item"`, undefined);
    }

}
