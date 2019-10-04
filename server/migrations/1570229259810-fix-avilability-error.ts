import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAvilabilityError1570229259810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","item_with_availability"]);
        await queryRunner.query(`DROP VIEW "item_with_availability"`, undefined);
        await queryRunner.query(`CREATE VIEW "item_with_availability" AS SELECT item.* AS "id", COUNT("orders"."id") AS "sold" FROM "item" "item" LEFT JOIN "order" "orders" ON orders."itemId" = "item"."id" GROUP BY "item"."id"`, undefined);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","item_with_availability","SELECT item.* AS \"id\", COUNT(\"orders\".\"id\") AS \"sold\" FROM \"item\" \"item\" LEFT JOIN \"order\" \"orders\" ON orders.\"itemId\" = \"item\".\"id\" GROUP BY \"item\".\"id\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","item_with_availability"]);
        await queryRunner.query(`DROP VIEW "item_with_availability"`, undefined);
        await queryRunner.query(`CREATE VIEW "item_with_availability" AS SELECT item.* AS "id", COUNT("item"."id") AS "sold" FROM "item" "item" LEFT JOIN "order" "orders" ON orders."itemId" = "item"."id" GROUP BY "item"."id"`, undefined);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","item_with_availability","SELECT item.* AS \"id\", COUNT(\"item\".\"id\") AS \"sold\" FROM \"item\" \"item\" LEFT JOIN \"order\" \"orders\" ON orders.\"itemId\" = \"item\".\"id\" GROUP BY \"item\".\"id\""]);
    }

}
