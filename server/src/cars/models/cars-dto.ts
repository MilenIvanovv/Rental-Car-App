import { Transform, Expose, Type } from "class-transformer";
import { CarStatus } from "../../common/car-status.enum";
import { RentedCar } from "../../database/entities/rentals.entity";
import { CarClass } from "../../database/entities/class.entity";


export class CarDTO {

  id: string;
  
  @Transform((carClass: CarClass) => carClass.name)
  class: CarClass;
  
  model: string;

  brand: string;
  
  picture: string;

  status: CarStatus;
  
  rentals: RentedCar[];

  @Expose()
  @Transform((carClass: CarClass, car) => car.class.price)
  price: number;
}