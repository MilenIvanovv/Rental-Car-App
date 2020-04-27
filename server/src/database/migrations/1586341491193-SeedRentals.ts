import { MigrationInterface, QueryRunner } from "typeorm";
import { initialRentals } from '../seed/rentals-seed';

export class SeedRentals1586341491193 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(initialRentals.map(async item =>
            await queryRunner.query(`INSERT INTO "rentals" ("id", "carId", "firstName", "lastName", "age", "status", "estimatedDate", "dateFrom", "pricePerDay") VALUES (DEFAULT, ${item.car}, '${item.firstName}', '${item.lastName}', ${item.age}, '${item.status}', '${item.estimatedDate}', '${item.dateFrom}', ${item.pricePerDay}) RETURNING "id"`)
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "rentals"');
    }
}
