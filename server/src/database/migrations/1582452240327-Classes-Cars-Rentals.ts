import {MigrationInterface, QueryRunner} from "typeorm";

export class ClassesCarsRentals1582452240327 implements MigrationInterface {
    name = 'ClassesCarsRentals1582452240327'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Classes" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "price" character varying(100) NOT NULL, CONSTRAINT "PK_c40ccdf38be3986bdc392ea428b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "rentals_status_enum" AS ENUM('open', 'returned')`, undefined);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" SERIAL NOT NULL, "estimatedDate" character varying(100) NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "age" character varying(100) NOT NULL, "status" "rentals_status_enum" NOT NULL, "returnDate" character varying NOT NULL, "carId" integer, CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "model" character varying(100) NOT NULL, "picture" character varying(100) NOT NULL, "classId" integer, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_d329e429e7a65281b1961171f59" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_d329e429e7a65281b1961171f59"`, undefined);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f"`, undefined);
        await queryRunner.query(`DROP TABLE "cars"`, undefined);
        await queryRunner.query(`DROP TABLE "rentals"`, undefined);
        await queryRunner.query(`DROP TYPE "rentals_status_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "Classes"`, undefined);
    }

}
