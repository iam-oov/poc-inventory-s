import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741484542967 implements MigrationInterface {
    name = 'Migrations1741484542967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "lat" numeric(10,8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD "lng" numeric(11,8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "location" text`);
    }

}
