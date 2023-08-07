import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MessageChatDto {
  @IsString()
  @IsNotEmpty()
  socket_id: string;

  @IsNumber()
  @IsNotEmpty()
  toAccount?: number;

  @IsString()
  @IsOptional()
  content?: string;
}
