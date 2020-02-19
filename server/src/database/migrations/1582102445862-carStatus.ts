import {MigrationInterface, QueryRunner} from "typeorm";

export class carStatus1582102445862 implements MigrationInterface {
    name = 'carStatus1582102445862'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmKLUDYJ-YQug7Xu4rEEpRx_0xkxVEyaGQB4qhxFmxZW4koO7S'`, undefined);
        await queryRunner.query(`CREATE TYPE "cars_class_enum" AS ENUM('A', 'B', ' C', 'D')`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "class" "cars_class_enum" NOT NULL`, undefined);
        await queryRunner.query(`CREATE TYPE "cars_carstatus_enum" AS ENUM('borrowed', 'listed')`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carStatus" "cars_carstatus_enum" NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carStatus"`, undefined);
        await queryRunner.query(`DROP TYPE "cars_carstatus_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "class"`, undefined);
        await queryRunner.query(`DROP TYPE "cars_class_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
    }

}
