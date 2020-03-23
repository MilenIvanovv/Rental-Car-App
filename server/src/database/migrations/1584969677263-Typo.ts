import {MigrationInterface, QueryRunner} from "typeorm";

export class Typo1584969677263 implements MigrationInterface {
    name = 'Typo1584969677263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "insureFeePerYear" TO "insuranceFeePerYear"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "insuranceFeePerYear" TO "insureFeePerYear"`, undefined);
    }

}
