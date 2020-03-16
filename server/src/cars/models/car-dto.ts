import { Publish } from '../../transformer/decorators/publish';
import { CarStatus } from '../../common/car-status.enum';
import { ClassDTO } from './class-todo';

export class CarDTO {
  @Publish()
  id: string;

  @Publish()
  model: string;

  @Publish()
  picture: string;

  @Publish()
  status: CarStatus

  @Publish(ClassDTO)
  class: ClassDTO;
}


