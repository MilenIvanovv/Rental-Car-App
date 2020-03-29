import { ClientDTO } from './client-dto';
import { IsNumber, IsNotEmpty, IsString, IsNotEmptyObject, IsDateString, ValidateNested } from 'class-validator';
import { IsDateOld } from '../../decorators/isDateOld';
import { Type } from 'class-transformer';

export class RentCarDTO {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsDateOld()
  estimatedDate: Date;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => ClientDTO)
  client: ClientDTO;
}