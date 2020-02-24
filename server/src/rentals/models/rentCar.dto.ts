import { ClientDTO } from './client.dto';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class RentCarDTO {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  returnDate: string;
  client: ClientDTO;
}