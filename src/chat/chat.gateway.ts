import { Logger, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtGuard, WsAuthGuard } from 'src/auth/guard';

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

  //@UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: string,
  ): void {
    console.log(client.id, payload);
    this.server.emit(
      'message',
      payload,
      client.id,
    );
  }
}
