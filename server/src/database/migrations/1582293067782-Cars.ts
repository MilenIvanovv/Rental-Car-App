import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import CarsRental


export class Cars1582293067782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository("Classes").save(ClassesSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
