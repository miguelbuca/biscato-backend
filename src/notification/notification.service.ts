import { Injectable } from '@nestjs/common';
import {
  CreateNotificationDto,
  EditNotificationDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  getNotifications() {
    return this.prisma.notification.findMany();
  }

  async createNotification(
    userId: number,
    dto: CreateNotificationDto,
  ) {
    const Notification =
      this.prisma.notification.create({
        data: {
          userId,
          ...dto,
        },
      });
    return Notification;
  }

  getUserNotifications(userId: number) {
    return this.prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async getNotificationById(
    NotificationId: number,
  ) {
    const Notification =
      await this.prisma.notification.findFirst({
        where: {
          id: NotificationId,
        },
        include: {
          user: true,
        },
      });
    return Notification;
  }

  async editNotificationById(
    notificationId: number,
    dto: EditNotificationDto,
  ) {
    const Notification =
      await this.prisma.notification.update({
        data: {
          ...dto
        },
        where: {
          id: notificationId,
        },
      });
    return Notification;
  }

  async deleteNotificationById(
    notificationId: number,
  ) {
    await this.prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });
  }
}
