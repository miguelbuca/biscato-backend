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

@Module({
  imports: [
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
  ],
  providers: [ChatGateway],
})
export class AppModule {}
