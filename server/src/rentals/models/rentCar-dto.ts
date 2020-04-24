import { IsNumber, IsNotEmpty, IsString, IsNotEmptyObject, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ClientDTO } from './client-dto';
import { IsDateOld } from '../../decorators/isDateOld';
import { isDateAfter } from '../../decorators/isDateAfter';

export class RentCarDTO {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsDateOld()
  fromDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsDateOld()
  @isDateAfter((r: RentCarDTO) => r.fromDate)
  estimatedDate: Date;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => ClientDTO)
  client: ClientDTO;
}