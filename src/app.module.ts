import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { SkillTypeModule } from './skill-type/skill-type.module';
import { SkillModule } from './skill/skill.module';
import { WorkModule } from './work/work.module';
import { ApplicationModule } from './application/application.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { PersonModule } from './person/person.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebsiteModule } from './website/website.module';
import { NotificationModule } from './notification/notification.module';
import { FollowModule } from './follow/follow.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    AddressModule,
    SkillTypeModule,
    SkillModule,
    WorkModule,
    ApplicationModule,
    ChatModule,
    PersonModule,
    WebsiteModule,
    NotificationModule,
    FollowModule,
    PortfolioModule,
    PortfolioItemModule,
  ],
})
export class AppModule {}
