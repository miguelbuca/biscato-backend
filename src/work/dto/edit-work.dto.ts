import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditWorkDto {
  @IsNumber()
  @IsOptional()
  costPerHour?: number

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  totalTime?: number

  @IsEnum(['HOUR','DAY', 'WEEK', 'MONTH', 'YEAR'])
  @IsOptional()
  time?: 'HOUR'|'DAY'| 'WEEK'| 'MONTH'| 'YEAR';

  @IsNumber()
  @IsOptional()
  skillTypeId?: number;

  @IsString()
  @IsOptional()
  term?: string
}
