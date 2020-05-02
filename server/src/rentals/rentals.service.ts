import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { RentedCar } from '../database/entities/rentals.entity';
import { Car } from '../database/entities/cars.entity';
import { ClientDTO } from './models/client-dto';
import { RentalStatus } from '../common/rental-status.enum';
import { CarStatus } from '../common/car-status.enum';
import { RentalDTO } from './models/rental-dto';
import { CalculateRentService } from '../core/calculate-rent.service';
import { JimpService } from '../core/jimp.service';
import { lowRes } from '../common/car-image-formats';

@Injectable()

export class RentalsService {

  constructor(
    @InjectRepository(RentedCar) private readonly rentalsRepository: Repository<RentedCar>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly calculate: CalculateRentService,
    private readonly jimpService: JimpService,
  ) { }

  async getRenals(): Promise<RentalDTO[]> {
    const rentals = await this.rentalsRepository.find({ where: { status: RentalStatus.open }, relations: ['car', 'car.class'] });

    return plainToClass(RentalDTO, rentals);
  }

  async rentCar(carId: number, fromDate: Date, estimatedDate: Date, client: ClientDTO): Promise<RentalDTO>  {
    const carToRent = await this.carRepository.findOne({ where: { id: carId }, relations: ['class'] });

    if (!carToRent) {
      throw new NotFoundException(`Car with ${carId} was not found`);
    }

    if (carToRent.status === CarStatus.borrowed) {
      throw new BadRequestException(`Car with ${carId} is borrowed`);
    }

    const days = this.calculate.days(new Date(fromDate), new Date(estimatedDate));
    const pricePerDay = this.calculate.applyAllToPrice(carToRent.class.price, days, client.age);

    carToRent.status = CarStatus.borrowed;
    
    const rental = {
      car: carToRent,
      estimatedDate,
      dateFrom: new Date(),
      status: RentalStatus.open,
      pricePerDay,
      ...client
    }
    
    const newRental = await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.getRepository(Car).save(carToRent);
      return await transactionalEntityManager.getRepository(RentedCar).save(rental);
    });
    
    return plainToClass(RentalDTO, newRental);
  }

  async returnCar(rentalId: string): Promise<RentalDTO>  {
    let rental = await this.rentalsRepository.findOne({ where: { id: rentalId }, relations: ['car', 'car.class'] });

    if (!rental) {
      throw new NotFoundException(`Contract with id ${rentalId} not found`);
    }

    if (rental.status === RentalStatus.returned) {
      throw new BadRequestException(`Contract with id ${rentalId} is closed`);
    }

    rental.status = RentalStatus.returned;
    rental.car.status = CarStatus.listed;
    rental.returnDate = new Date();
    
    rental = await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.getRepository(Car).save(rental.car);
      return await transactionalEntityManager.getRepository(RentedCar).save(rental);
    });
    
    return plainToClass(RentalDTO, rental);
  }
}
