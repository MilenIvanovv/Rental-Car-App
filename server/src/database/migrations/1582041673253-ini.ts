import {MigrationInterface, QueryRunner} from "typeorm";

export class ini1582041673253 implements MigrationInterface {
    name = 'ini1582041673253'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "model" character varying(100) NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "cars"`, undefined);
    }

}
