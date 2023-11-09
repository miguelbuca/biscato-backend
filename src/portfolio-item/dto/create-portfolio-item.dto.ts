import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class CreatePortfolioItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  portfolioId: number;

  @IsNotEmpty()
  @IsNumber()
  personId: number;
}
