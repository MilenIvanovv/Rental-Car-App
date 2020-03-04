import {MigrationInterface, QueryRunner} from "typeorm";

export class nullable1583327771016 implements MigrationInterface {
    name = 'nullable1583327771016'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "estimatedDate" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "dateFrom" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "dateFrom" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "estimatedDate" DROP NOT NULL`, undefined);
    }

}
