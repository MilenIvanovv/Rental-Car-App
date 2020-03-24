import {MigrationInterface, QueryRunner} from "typeorm";

export class IncsuranceFeeAndExpencesNulable1584969562152 implements MigrationInterface {
    name = 'IncsuranceFeeAndExpencesNulable1584969562152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "insureFeePerYear" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "monthlyExpences" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "monthlyExpences" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "insureFeePerYear" DROP NOT NULL`, undefined);
    }

}
