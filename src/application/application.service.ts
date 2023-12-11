import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateApplicationDto,
  EditApplicationDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  getApplications() {
    return this.prisma.application.findMany();
  }

  async createApplication(
    userId: number,
    dto: CreateApplicationDto,
  ) {
    const application =
      await this.prisma.application.count({
        where: {
          workId: dto.workId,
          AND: {
            userId,
          },
        },
      });
    if (application > 0)
      throw new ForbiddenException(
        'The user has already applied',
      );
    else {
      const Application =
        this.prisma.application.create({
          data: {
            userId,
            ...dto,
          },
        });
      return Application;
    }
  }

  getUserApplications(userId: number) {
    return this.prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
      include: {
        user: true,
        work: {
          include: {
            skillType: true,
            user: true,
          },
        },
      },
    });
  }

  getWorkApplications(workId: number) {
    return this.prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        workId,
      },
      include: {
        user: {
          include: {
            persons: true,
          },
        },
        work: {
          include: {
            skillType: true,
          },
        },
      },
    });
  }

  async getApplicationById(
    applicationId: number,
  ) {
    const Application =
      await this.prisma.application.findFirst({
        where: {
          id: applicationId,
        },
        include: {
          user: true,
          work: true,
        },
      });
    return Application;
  }

  async editAdddressById(
    applicationId: number,
    dto: EditApplicationDto,
  ) {
    const application =
      await this.prisma.application.update({
        data: dto,
        where: {
          id: applicationId,
        },
      });
    return application;
  }

  async deleteAdddressById(
    applicationId: number,
  ) {
    await this.prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  }
}
