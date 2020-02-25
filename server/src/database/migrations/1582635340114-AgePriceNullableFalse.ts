import {MigrationInterface, QueryRunner} from "typeorm";

export class AgePriceNullableFalse1582635340114 implements MigrationInterface {
    name = 'AgePriceNullableFalse1582635340114'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Classes" ALTER COLUMN "price" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "age" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "age" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "Classes" ALTER COLUMN "price" DROP NOT NULL`, undefined);
    }

}
