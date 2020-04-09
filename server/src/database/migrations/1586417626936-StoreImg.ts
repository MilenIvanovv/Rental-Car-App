import {MigrationInterface, QueryRunner} from "typeorm";
import { FsService } from '../../core/fs/fs.service';
import cars  from '../seed/cars-seed';

export class StoreImg1586417626936 implements MigrationInterface {
    name = 'StoreImg1586417626936'

    fsService = new FsService();

    public async up(queryRunner: QueryRunner): Promise<void> {
        const path = './src/database/seed/car-images';
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" bytea`, undefined);
        await Promise.all(cars.map(async car => {
            const imgBase64 = (await this.fsService.readFile(`${path}/${car.model}.jpg`)).toString('base64');

            return await queryRunner.query(`UPDATE "cars" SET "picture" = '${imgBase64}' WHERE model = '${car.model}'`, undefined);
        }));
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "picture" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying`, undefined);
    }

}
