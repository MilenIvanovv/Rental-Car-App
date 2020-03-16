import { ClientDTO } from './client-dto';
import { IsNumber, IsNotEmpty, IsString, IsNotEmptyObject, IsDateString } from 'class-validator';
import { IsDateOld } from '../../decorators/isDateOld';

export class RentCarDTO {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsDateOld()
  estimatedDate: Date;

  @IsNotEmptyObject()
  client: ClientDTO;
}