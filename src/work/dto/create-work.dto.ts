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

  @IsOptional()
  address?: CreateAddressDto;
}
