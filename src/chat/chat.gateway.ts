import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageChatDto } from './dto';

@WebSocketGateway()
export class ChatGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger();
  private connectedUsers: Map<string, Socket> =
    new Map();

  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }
  handleConnection(client: Socket) {
    this.connectedUsers.set(client.id, client);
  }
  afterInit(server: Server) {
    this.logger.log('[ws]: started');
  }
  handleMessage(payload: any) {
    if (!payload) return;
    
    /*this.server.emit(
      payload.fromAccount.toString(),
      payload,
    );*/
    this.server.emit(
      payload.toAccount.toString(),
      payload,
    );
  }
}
