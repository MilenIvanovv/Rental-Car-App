import {MigrationInterface, QueryRunner} from "typeorm";

export class PricePerDayNullableFalse1585039488717 implements MigrationInterface {
    name = 'PricePerDayNullableFalse1585039488717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "pricePerDay" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "pricePerDay" DROP NOT NULL`, undefined);
    }

}
