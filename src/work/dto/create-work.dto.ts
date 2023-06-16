import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto';
export class CreateWorkDto {
  @IsNumber()
  @IsNotEmpty()
  costPerHour: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  totalTime: number;

  @IsEnum(['HOUR','DAY', 'WEEK', 'MONTH', 'YEAR'])
  @IsNotEmpty()
  time: 'HOUR'|'DAY'| 'WEEK'| 'MONTH'| 'YEAR';

  @IsString()
  @IsOptional()
  term: string;

  @IsNumber()
  @IsNotEmpty()
  skillTypeId: number;

  @IsOptional()
  address?: CreateAddressDto;
}
