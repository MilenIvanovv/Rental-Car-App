import {MigrationInterface, QueryRunner} from "typeorm";
import { extraCars } from '../seed/cars-seed';

export class SeedExtraCars1587971758748 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(extraCars.map(async item =>
            await queryRunner.query(`INSERT INTO "cars" ("id", "model", "brand", "picture", "classId", "status", "insuranceFeePerYear", "monthlyExpences") VALUES (DEFAULT, '${item.model}', '${item.brand}', '${item.picture}', ${item.class}, '${item.status}', ${item.insuranceFeePerYear}, ${item.monthlyExpences}) RETURNING "id"`)
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(extraCars.map(async item =>
            await queryRunner.query(`DELETE FROM "cars" WHERE cars.picture = '${item.picture}' `)
        ));
    }
}
