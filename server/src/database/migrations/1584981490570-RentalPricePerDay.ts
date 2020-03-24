import {MigrationInterface, QueryRunner} from "typeorm";

export class RentalPricePerDay1584981490570 implements MigrationInterface {
    name = 'RentalPricePerDay1584981490570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pricePerDay" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pricePerDay"`, undefined);
    }

}
