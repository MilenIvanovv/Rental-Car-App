import { createConnection } from 'typeorm';
import ClassesSeed from './classes-seed';
import CarsSeed from './cars-seed';
import RentalsSeed from './rentals-seed';

const main = async () => {

  const connection = await createConnection();

  const classes = await connection.getRepository("Classes").find();

  if (classes.length) {
    console.log(`Skipped seed. Database is not empty!`);
  } else {
    await connection.getRepository("Classes").save(ClassesSeed);
    await connection.getRepository("cars").save(CarsSeed);
    await connection.getRepository("rentals").save(RentalsSeed);

    
    // tslint:disable: no-console
    console.log(`Data seeded successfully`);
  }
  
  connection.close();
};

main()
  .catch(console.log);
