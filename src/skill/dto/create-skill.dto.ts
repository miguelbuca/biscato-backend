import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  skillTypeId?: number
}
