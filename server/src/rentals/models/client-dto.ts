import { IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';

export class ClientDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  age: number;
}