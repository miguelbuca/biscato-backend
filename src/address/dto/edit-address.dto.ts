import {
  IsOptional,
  IsLatitude,
  IsLongitude,
  IsString,
} from 'class-validator';

export class EditAddressDto {
  @IsLatitude()
  @IsOptional()
  lat?: number;

  @IsLongitude()
  @IsOptional()
  lng?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
