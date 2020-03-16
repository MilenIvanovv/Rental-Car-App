import { ClientDTO } from './client-dto';
import { IsNumber, IsNotEmpty, IsString, IsNotEmptyObject, IsDateString } from 'class-validator';
import { IsDateOld } from '../../decorators/isDateOld';
import { CarDTO } from '../../cars/models/car-dto';
import { RentalStatus } from '../../common/rental-status.enum';
import { Publish } from '../../transformer/decorators/publish';

export class RentalDTO {
  @Publish()
  id: string;

  @Publish(CarDTO)
  car: CarDTO;

  @Publish()
  estimatedDate: Date;

  @Publish()
  firstName: string;

  @Publish()
  lastName: string;

  @Publish()
  age: number;

  @Publish()
  status: RentalStatus;

  @Publish()
  returnDate: Date;

  @Publish()
  dateFrom: Date;
}