import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import CarsSeed from '../seed/cars-seed';

export class CarsSeed1582452334230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository("cars").save(CarsSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getRepository("cars").delete(CarsSeed);
    }

}
