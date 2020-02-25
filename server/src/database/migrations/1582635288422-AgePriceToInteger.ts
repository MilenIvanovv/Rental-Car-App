import {MigrationInterface, QueryRunner} from "typeorm";

export class AgePriceToInteger1582635288422 implements MigrationInterface {
    name = 'AgePriceToInteger1582635288422'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Classes" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" ADD "price" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "age"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "age" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "age"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "age" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" ADD "price" numeric NOT NULL`, undefined);
    }

}
