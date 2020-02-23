import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import ClassesSeed from "../seed/classes-seed";

export class ClassesSeed1582452324056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository("Classes").save(ClassesSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getRepository("Classes").delete(ClassesSeed);
    }

}
