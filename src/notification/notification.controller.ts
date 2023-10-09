import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateNotificationDto,
  EditNotificationDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
  ) {}

  @Get()
  getNotifications() {
    return this.notificationService.getNotifications();
  }

  @Get('me')
  getUserNotifications(
    @GetUser('id') userId: number,
  ) {
    return this.notificationService.getUserNotifications(
      userId,
    );
  }

  @Get('me/count')
  getUserNotificationsCount(
    @GetUser('id') userId: number,
  ) {
    return this.notificationService.getUserNotificationsCount(
      userId,
    );
  }

  @Post()
  createNotification(
    @GetUser('id') userId: number,
    @Body() dto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotification(
      userId,
      dto,
    );
  }

  @Get(':id')
  getNotificationById(
    @Param('id', ParseIntPipe)
    notificationId: number,
  ) {
    return this.notificationService.getNotificationById(
      notificationId,
    );
  }

  @Patch(':id')
  editNotificationById(
    @Param('id', ParseIntPipe)
    notificationId: number,
    @Body() dto: EditNotificationDto,
  ) {
    return this.notificationService.editNotificationById(
      notificationId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNotificationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    notificationId: number,
  ) {
    return this.notificationService.deleteNotificationById(
      notificationId,
    );
  }
}
