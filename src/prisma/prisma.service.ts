import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDb() {
    return this.$transaction([
      this.contract.deleteMany(),
      this.interaction.deleteMany(),
      this.rating.deleteMany(),
      this.work.deleteMany(),
      this.skill.deleteMany(),
      this.skillType.deleteMany(),
      this.person.deleteMany(),
      this.user.deleteMany(),
      this.application.deleteMany(),
    ]);
  }
}
