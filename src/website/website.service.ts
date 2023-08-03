import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) {}
  async getPageInfo() {
    const userCount =
      await this.prisma.user.count({
        where: {
          status: 'ACTIVE',
        },
      });
    const workCount =
      await this.prisma.work.count({
        where: {
          status: 'ACTIVE',
        },
      });

    const skillTypeCount =
      await this.prisma.skillType.count({
        where: {
          status: 'ACTIVE',
        },
      });

    const professions =
      await this.prisma.skillType.findMany({
        where: {
          status: 'ACTIVE',
        },
        select: {
          name: true,
          _count: true,
        },
      });

    return {
      userCount,
      workCount,
      skillTypeCount,
      professions,
    };
  }
}
