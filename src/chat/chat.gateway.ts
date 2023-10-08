import {
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

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

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }
  async handleConnection(client: Socket) {
    try {
      const payload = await this.jwt.verify(
        client.handshake?.auth?.token ||
          client.handshake?.headers?.token,
        {
          secret: this.config.get('JWT_SECRET'),
        },
      );

      if (!payload) {
        client.disconnect();
        return;
      }
      this.connectedUsers.set(
        payload.sub,
        client,
      );
    } catch (error) {
      this.logger.log(error);
    }
  }
  afterInit(server: Server) {
    this.logger.log('[ws]: started');
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any) {
    if (!payload) return;

    const [fromAccount, toAccount] = [
      this.connectedUsers.get(
        payload.fromAccount,
      ),
      this.connectedUsers.get(payload.toAccount),
    ];

    fromAccount?.emit?.('message', payload);
    toAccount?.emit?.('message', payload);
  }
}
