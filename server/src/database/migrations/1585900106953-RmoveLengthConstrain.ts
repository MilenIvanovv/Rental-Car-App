import {MigrationInterface, QueryRunner} from "typeorm";

export class RmoveLengthConstrain1585900106953 implements MigrationInterface {
    name = 'RmoveLengthConstrain1585900106953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "picture"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "picture" character varying(100) NOT NULL`, undefined);
    }

}
