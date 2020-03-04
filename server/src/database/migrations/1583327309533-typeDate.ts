import {MigrationInterface, QueryRunner} from "typeorm";

export class typeDate1583327309533 implements MigrationInterface {
    name = 'typeDate1583327309533'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "estimatedDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "estimatedDate" date`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" date`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dateFrom"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dateFrom" date`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dateFrom"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dateFrom" character varying NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "estimatedDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "estimatedDate" character varying(100) NOT NULL`, undefined);
    }

}
