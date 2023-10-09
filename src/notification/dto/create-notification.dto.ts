import {
  IsEnum,
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

  @IsEnum(['SYSTEM', 'USER'])
  @IsOptional()
  type?: 'SYSTEM' | 'USER';

  @IsJSON()
  @IsOptional()
  extra?: object;
}
