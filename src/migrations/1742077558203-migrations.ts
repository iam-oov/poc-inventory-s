import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742077558203 implements MigrationInterface {
    name = 'Migrations1742077558203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movement_type_enum" AS ENUM('in', 'out', 'transfer')`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "sourceStoreId" text NOT NULL, "toStoreId" text, "quantity" integer NOT NULL, "type" "public"."movement_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_079f005d01ebda984e75c2d67ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "storeId" text NOT NULL, "quantity" integer NOT NULL, "minStock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "category" text, "price" numeric(10,2) NOT NULL, "sku" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movement" ADD CONSTRAINT "FK_e2f7dc9076f2b72c075c97154ce" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8622e1e24c6d054d36e8824490" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8622e1e24c6d054d36e8824490"`);
        await queryRunner.query(`ALTER TABLE "movement" DROP CONSTRAINT "FK_e2f7dc9076f2b72c075c97154ce"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP TYPE "public"."movement_type_enum"`);
    }

}
