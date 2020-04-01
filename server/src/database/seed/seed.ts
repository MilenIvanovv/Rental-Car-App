import { createConnection } from 'typeorm';
import ClassesSeed from './classes-seed';
import CarsSeed from './cars-seed';
import RentalsSeed from './rentals-seed';

const main = async () => {

  const connection = await createConnection();
  await connection.getRepository("Classes").save(ClassesSeed);
  await connection.getRepository("cars").save(CarsSeed);
  await connection.getRepository("rentals").save(RentalsSeed);

  connection.close();

  // tslint:disable: no-console
  console.log(`Data seeded successfully`);
};

main()
  .catch(console.log);
