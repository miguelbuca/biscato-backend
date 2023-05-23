import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSkillTypeDto {
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
