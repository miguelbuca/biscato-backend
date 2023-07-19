import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3333)
export class ChatGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger();

  handleDisconnect(client: Socket) {
    this.logger.log(
      `Client disconnected: ${client.id}`,
    );
  }
  handleConnection(client: Socket) {
    this.logger.log(
      `Client connected: ${client.id}`,
    );
  }
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: string,
  ): void {
    this.server.emit(
      'message',
      payload,
      client.id,
    );
  }
}
