import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { MessageChatDto } from './dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private chatgateway: ChatGateway,
  ) {}
  async sendMessage(
    userId: number,
    dto: MessageChatDto,
  ) {
    const { content, toAccount } = dto;

    const message = await this.prisma.chat.create(
      {
        data: {
          content,
          sender: {
            connect: {
              id: userId,
            },
          },
          receiver: {
            connect: {
              id: toAccount,
            },
          },
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              persons: {
                select: {
                  id: true,
                  nif: true,
                  phoneNumber: true,
                  avatar: true,
                },
              },
            },
          },
          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              persons: {
                select: {
                  id: true,
                  nif: true,
                  phoneNumber: true,
                  avatar: true,
                },
              },
            },
          },
        },
      },
    );

    if (message) {
      this.chatgateway.handleMessage(message);
    }

    return message;
  }
  async readMessage(
    userId: number,
    otherAccountId: number,
  ) {
    return await this.prisma.chat.findMany({
      where: {
        OR: [
          {
            AND: [
              { fromAccount: userId },
              { toAccount: otherAccountId },
            ],
          },
          {
            AND: [
              { fromAccount: otherAccountId },
              { toAccount: userId },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      // take: 5,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            persons: {
              select: {
                id: true,
                nif: true,
                phoneNumber: true,
                avatar: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            persons: {
              select: {
                id: true,
                nif: true,
                phoneNumber: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
}
