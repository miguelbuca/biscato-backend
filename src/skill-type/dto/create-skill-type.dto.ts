import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSkillTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
