import { ClientDTO } from './client.dto';
import { IsNumber, IsNotEmpty, IsString, IsNotEmptyObject } from 'class-validator';

export class RentCarDTO {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  estimatedDate: string;

  @IsNotEmptyObject()
  client: ClientDTO;
}