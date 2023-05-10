import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class EditSkillTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
