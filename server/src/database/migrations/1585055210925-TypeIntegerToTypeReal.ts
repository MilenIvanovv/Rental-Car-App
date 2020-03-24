import {MigrationInterface, QueryRunner} from "typeorm";

export class TypeIntegerToTypeReal1585055210925 implements MigrationInterface {
    name = 'TypeIntegerToTypeReal1585055210925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pricePerDay"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pricePerDay" real NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "insuranceFeePerYear"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "insuranceFeePerYear" real NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "monthlyExpences"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "monthlyExpences" real NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "monthlyExpences"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "monthlyExpences" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "insuranceFeePerYear"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "insuranceFeePerYear" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pricePerDay"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pricePerDay" integer NOT NULL`, undefined);
    }

}
