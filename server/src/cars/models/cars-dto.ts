import { CarClass } from "src/database/entities/class.entity";
import { CarStatus } from "src/common/car-status.enum";
import { RentedCar } from "src/database/entities/rentals.entity";
import { Transform, Expose, Exclude } from "class-transformer";

export class CarDTO {
  id: string;
  
  @Transform((carClass: CarClass) => carClass.name)
  class: CarClass;
  
  model: string;
  
  picture: string;

  status: CarStatus;
  
  rentals: RentedCar[];

  @Expose()
  @Transform((carClass: CarClass, car) => car.class.price)
  price: number;
}