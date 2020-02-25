import {MigrationInterface, QueryRunner} from "typeorm";

export class AgePriceToNumber1582634827399 implements MigrationInterface {
    name = 'AgePriceToNumber1582634827399'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Classes" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" ADD "price" numeric`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "age"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "age" numeric`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "age"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "age" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" ADD "price" character varying(100) NOT NULL`, undefined);
    }

}
