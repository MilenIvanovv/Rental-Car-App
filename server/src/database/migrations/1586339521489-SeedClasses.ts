import { MigrationInterface, QueryRunner } from "typeorm";
import classes from '../seed/classes-seed';

export class SeedClasses1586339521489 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(classes.map(async item =>
            await queryRunner.query(`INSERT INTO "Classes" ("id", "name", "price") VALUES (DEFAULT, '${item.name}', ${item.price}) RETURNING "id"`)
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "Classes"');
    }
}
