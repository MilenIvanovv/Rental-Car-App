import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedStatusToCars1582642165846 implements MigrationInterface {
    name = 'AddedStatusToCars1582642165846'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "cars_status_enum" AS ENUM('borrowed', 'listed')`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "status" "cars_status_enum"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "status"`, undefined);
        await queryRunner.query(`DROP TYPE "cars_status_enum"`, undefined);
    }

}
