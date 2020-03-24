import {MigrationInterface, QueryRunner} from "typeorm";

export class IncsuranceFeeAndExpences1584969181590 implements MigrationInterface {
    name = 'IncsuranceFeeAndExpences1584969181590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "insureFeePerYear" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "monthlyExpences" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "monthlyExpences"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "insureFeePerYear"`, undefined);
    }

}
