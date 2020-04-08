import {MigrationInterface, QueryRunner} from "typeorm";
import cars from '../seed/cars-seed';

export class SeedCars1586340091649 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(cars.map(async item =>
            await queryRunner.query(`INSERT INTO "cars" ("id", "model", "picture", "classId", "status", "insuranceFeePerYear", "monthlyExpences") VALUES (DEFAULT, '${item.model}', '${item.picture}', ${item.class}, '${item.status}', ${item.insuranceFeePerYear}, ${item.monthlyExpences}) RETURNING "id"`)
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "cars"')
    }
}
