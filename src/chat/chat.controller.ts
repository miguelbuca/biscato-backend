import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ChatService } from './chat.service';
import { MessageChatDto } from './dto';

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatservice: ChatService) {}

  @Get('/messages/:otherAccountId')
  readMessage(
    @GetUser('id') userId: number,
    @Param('otherAccountId', ParseIntPipe)
    otherAccountId: number,
  ) {
    return this.chatservice.readMessage(
      userId,
      otherAccountId,
    );
  }
  @Post('/messages')
  handlerMessage(
    @GetUser('id') userId: number,
    @Body() dto: MessageChatDto,
  ) {
    return this.chatservice.sendMessage(
      userId,
      dto,
    );
  }
}
