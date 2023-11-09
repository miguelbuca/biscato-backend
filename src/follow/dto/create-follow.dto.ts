import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateFollowDto {
  @IsNotEmpty()
  @IsNumber()
  personId: number
}
