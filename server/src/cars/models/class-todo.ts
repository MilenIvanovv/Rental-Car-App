import { Publish } from '../../transformer/decorators/publish';

export class ClassDTO {

  @Publish()
  id: string;

  @Publish()
  name: string;

  @Publish()
  price: number;
}

