import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreatePortfolioDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  biography: string;

  @IsNotEmpty()
  @IsNumber()
  personId: number;
}
