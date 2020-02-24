import { getRepository, MigrationInterface, QueryRunner} from "typeorm";
import RentalsSeed from '../seed/rentals-seed';

export class rentalsSeed1582540285070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getRepository("rentals").save(RentalsSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getRepository("rentals").delete(RentalsSeed);
    }

}
