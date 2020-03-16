import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RentedCar } from '../database/entities/rentals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Car } from '../database/entities/cars.entity';
import { ClientDTO } from './models/client-dto';
import { RentalStatus } from '../common/rental-status.enum';
import { CarStatus } from '../common/car-status.enum';



@Injectable()

export class RentalsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) { }

  async getRenals() {
    return await this.rentalsRepository.find({ relations: ['car', 'car.class'] });
  }

  async rentCar(carId: number, estimatedDate: Date, client: ClientDTO,
  ) {
    const carToRent = await this.carRepository.findOne(carId);

    if (!carToRent) {
      throw new NotFoundException(`Car with ${carId} was not found`);
    }

    if (carToRent.status === CarStatus.borrowed) {
      throw new BadRequestException(`Car with ${carId} is borrowed`);
    }

    carToRent.status = CarStatus.borrowed;

    return await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.getRepository(Car).save(carToRent);
      return await transactionalEntityManager.getRepository(RentedCar).save({ car: carToRent, estimatedDate, dateFrom: new Date(), status: RentalStatus.open, ...client });
    });
  }

  async returnCar(rentalId: string,
  ) {
    const rental = await this.rentalsRepository.findOne({ where: { id: rentalId }, relations: ['car'] });

    if (!rental) {
      throw new NotFoundException(`Contract with id ${rentalId} not found`);
    }

    if (rental.status === RentalStatus.returned) {
      throw new BadRequestException(`Contract with id ${rentalId} is closed`);
    }

    rental.status = RentalStatus.returned;
    rental.car.status = CarStatus.listed;
    rental.returnDate = new Date();

    return await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.getRepository(Car).save(rental.car);
      return await transactionalEntityManager.getRepository(RentedCar).save(rental);
    });
  }
}
