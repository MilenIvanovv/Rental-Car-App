import { MigrationInterface, QueryRunner } from "typeorm";
import cars from '../seed/cars-seed';

export class AddBrandProp1586772301219 implements MigrationInterface {
    name = 'AddBrandProp1586772301219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand" character varying(100)`, undefined);
        await Promise.all(cars.map(async car => {
                const brandAndModel = car.model.split(" ");
                await queryRunner.query(`UPDATE "cars" SET "brand" = '${brandAndModel[0]}' WHERE model = '${car.model}'`, undefined);
                await queryRunner.query(`UPDATE "cars" SET "model" = '${brandAndModel[1]}' WHERE model = '${car.model}'`, undefined);
            }
        ))
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "brand" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand"`, undefined);
        await Promise.all(cars.map(async car => {
            await queryRunner.query(`UPDATE "cars" SET "model" = '${car.model}' WHERE model = '${car.model}'`, undefined);
        }
    ))
    }

}
