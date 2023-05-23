import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class EditSkillDto {
  @IsString()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  skillTypeId?: number
}
