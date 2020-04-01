import { Expose, Exclude, Transform, Type } from 'class-transformer';
import { RentalStatus } from '../../common/rental-status.enum';
import { CarDTO } from '../../cars/models/cars-dto';
import { ClientDTO } from './client-dto';

export class RentalDTO {
  id: string;

  @Type(() => CarDTO)
  car: CarDTO;

  estimatedDate: Date;

  @Exclude()
  firstName: string;

  @Exclude()
  lastName: string;

  @Exclude()
  age: number;

  status: RentalStatus;

  returnDate: Date;

  dateFrom: Date;

  @Exclude()
  pricePerDay: number;

  @Expose()
  @Transform((value, rental: RentalDTO) => ({
    firstName: rental.firstName,
    lastName: rental.lastName,
    age: rental.age,
  }))
  client: ClientDTO
}