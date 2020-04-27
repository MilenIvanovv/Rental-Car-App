import {MigrationInterface, QueryRunner} from "typeorm";
import moment from 'moment';
import { extraRentals, lastMonthsExtraRentals } from '../seed/rentals-seed';

export class SeedExtraRentals1587984364310 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(extraRentals.map(async item =>
            await queryRunner.query(`INSERT INTO "rentals" ("id", "carId", "firstName", "lastName", "age", "status", "returnDate", "estimatedDate", "dateFrom", "pricePerDay") VALUES (DEFAULT, ${item.car}, '${item.firstName}', '${item.lastName}', ${item.age}, '${item.status}', '${item.returnDate}', '${item.estimatedDate}', '${item.dateFrom}', ${item.pricePerDay}) RETURNING "id"`)
        ));
        await Promise.all(lastMonthsExtraRentals.map(async item =>
            await queryRunner.query(`INSERT INTO "rentals" ("id", "carId", "firstName", "lastName", "age", "status", "returnDate", "estimatedDate", "dateFrom", "pricePerDay") VALUES (DEFAULT, ${item.car}, '${item.firstName}', '${item.lastName}', ${item.age}, '${item.status}', '${item.returnDate}', '${item.estimatedDate}', '${item.dateFrom}', ${item.pricePerDay}) RETURNING "id"`)
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // return await queryRunner.query(`DELETE FROM rentals WHERE rentals.lastName = 'Petkovich' `);
    }
}
