import { CarStatus } from '../../common/car-status.enum';
import { ClassDTO } from './class-dto';
import { Transform, Exclude, Expose } from 'class-transformer';
import { CarClass } from '../../database/entities/class.entity';

export class CarDTO {
  id: string;

  model: string;

  picture: string;

  status: CarStatus

  @Transform((carClass: CarClass) => carClass.name)
  class: ClassDTO;

  @Expose()
  @Transform((carClass: CarClass, car) => car.class.price)
  price?: number;
}


