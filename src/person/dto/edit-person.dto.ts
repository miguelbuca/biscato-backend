import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateAddressDto, EditAddressDto } from 'src/address/dto';

export class EditPersonDto {
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  nif?: string;

  @IsDateString()
  @IsOptional()
  birthday?: string;


  @IsOptional()
  address?: EditAddressDto;
}
