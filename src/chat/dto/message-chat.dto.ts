import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MessageChatDto {
  @IsNumber()
  @IsNotEmpty()
  toAccount?: number;

  @IsString()
  @IsOptional()
  content?: string;
}
