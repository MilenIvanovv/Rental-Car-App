import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ClientDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}