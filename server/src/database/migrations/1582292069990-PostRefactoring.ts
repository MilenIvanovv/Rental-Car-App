import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1582292069990 implements MigrationInterface {
    name = 'PostRefactoring1582292069990'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Classes" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "price" character varying(100) NOT NULL, CONSTRAINT "PK_c40ccdf38be3986bdc392ea428b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "rentals_status_enum" AS ENUM('open', 'returned')`, undefined);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" SERIAL NOT NULL, "estimatedDate" character varying(100) NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "age" character varying(100) NOT NULL, "status" "rentals_status_enum" NOT NULL, "returnDate" character varying NOT NULL, "carId" integer, CONSTRAINT "REL_7e07037bddbd4c16a105cbd904" UNIQUE ("carId"), CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "model"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "class"`, undefined);
        await queryRunner.query(`DROP TYPE "public"."cars_class_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carStatus"`, undefined);
        await queryRunner.query(`DROP TYPE "public"."cars_carstatus_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`CREATE TYPE "public"."cars_carstatus_enum" AS ENUM('borrowed', 'listed')`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carStatus" "cars_carstatus_enum" NOT NULL`, undefined);
        await queryRunner.query(`CREATE TYPE "public"."cars_class_enum" AS ENUM('A', 'B', ' C', 'D')`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "class" "cars_class_enum" NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmKLUDYJ-YQug7Xu4rEEpRx_0xkxVEyaGQB4qhxFmxZW4koO7S'`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "model" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "rentals"`, undefined);
        await queryRunner.query(`DROP TYPE "rentals_status_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "Classes"`, undefined);
    }

}
