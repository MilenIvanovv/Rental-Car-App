import {MigrationInterface, QueryRunner} from "typeorm";

export class RentalDate1582626871703 implements MigrationInterface {
    name = 'RentalDate1582626871703'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dateFrom" character varying NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dateFrom"`, undefined);
    }

}
