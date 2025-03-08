import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741467677312 implements MigrationInterface {
    name = 'Migrations1741467677312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_transfer" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "from_store_id" integer NOT NULL, "to_store_id" integer NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transfer_date" TIMESTAMP NOT NULL DEFAULT now(), "username" text NOT NULL, CONSTRAINT "PK_00312bb00408c3fb8069bed044e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "category_id" integer NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "store_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" text NOT NULL, "location" text, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_transfer" ADD CONSTRAINT "FK_1a1690f29097b48da6da8324814" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_transfer" ADD CONSTRAINT "FK_34e1ef8980ba11a639d2b694f7a" FOREIGN KEY ("from_store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_transfer" ADD CONSTRAINT "FK_0a11d93a93f81e904b436184375" FOREIGN KEY ("to_store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product_transfer" DROP CONSTRAINT "FK_0a11d93a93f81e904b436184375"`);
        await queryRunner.query(`ALTER TABLE "product_transfer" DROP CONSTRAINT "FK_34e1ef8980ba11a639d2b694f7a"`);
        await queryRunner.query(`ALTER TABLE "product_transfer" DROP CONSTRAINT "FK_1a1690f29097b48da6da8324814"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_transfer"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
