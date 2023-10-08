import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsJSON()
  @IsOptional()
  extra?: object;
}
