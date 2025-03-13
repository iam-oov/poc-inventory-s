import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741633292457 implements MigrationInterface {
    name = 'Migrations1741633292457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movement_type_enum" AS ENUM('in', 'out', 'transfer')`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "source_store_id" text NOT NULL, "to_store_id" text NOT NULL, "quantity" integer NOT NULL, "type" "public"."movement_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_079f005d01ebda984e75c2d67ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "store_id" text NOT NULL, "quantity" integer NOT NULL, "min_stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "category" text, "price" numeric(10,2) NOT NULL, "sku" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movement" ADD CONSTRAINT "FK_04fb7658224d6ceadd8e400283e" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`ALTER TABLE "movement" DROP CONSTRAINT "FK_04fb7658224d6ceadd8e400283e"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP TYPE "public"."movement_type_enum"`);
    }

}
