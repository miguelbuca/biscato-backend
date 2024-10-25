import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class EditSkillTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  svgXml?: string

  @IsString()
  @IsOptional()
  background?: string
}
