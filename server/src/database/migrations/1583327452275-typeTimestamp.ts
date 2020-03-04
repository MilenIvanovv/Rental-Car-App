import {MigrationInterface, QueryRunner} from "typeorm";

export class typeTimestamp1583327452275 implements MigrationInterface {
    name = 'typeTimestamp1583327452275'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "estimatedDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "estimatedDate" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dateFrom"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dateFrom" TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dateFrom"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dateFrom" date`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" date`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "estimatedDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "estimatedDate" date`, undefined);
    }

}
