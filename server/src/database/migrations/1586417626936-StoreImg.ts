import { MigrationInterface, QueryRunner } from "typeorm";
import cars from '../seed/cars-seed';

export class StoreImg1586417626936 implements MigrationInterface {
    name = 'StoreImg1586417626936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying`, undefined);
        await Promise.all(cars.map(async car => 
            await queryRunner.query(`UPDATE "cars" SET "picture" = '${car.model}' WHERE model = '${car.model}'`, undefined)
        ));
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "picture" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying`, undefined);
    }
}
