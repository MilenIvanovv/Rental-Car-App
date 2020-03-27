import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class SelectedMonth {
  @IsNotEmpty()
  @IsNumber()
  @Max(new Date().getFullYear())
  @Min(1970)
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  month: number;
}