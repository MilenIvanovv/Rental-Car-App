import { IsNotEmpty, IsString } from 'class-validator';

export class ClientDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  age: string;
}