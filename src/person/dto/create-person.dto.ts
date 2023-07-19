import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto';

export class CreatePersonDto {
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  nif: string;

  @IsDateString()
  @IsOptional()
  birthday: string;

  @IsOptional()
  address?: CreateAddressDto;
}
