import { Injectable } from '@nestjs/common';
import {
  CreateWorkDto,
  EditWorkDto,
  FilterWorkDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}
  getWorks(filter?: FilterWorkDto) {
    const where = {};

    if (
      (filter.skillType &&
        filter.skillType !== '' &&
        filter.skillType !== 'null' &&
      filter.skillType !== 'undefined')
    ) {
      where['skillType'] = {
        name: filter.skillType,
      };
    }

    if (
      filter.type &&
      filter.type !== '' &&
      filter.type !== 'null' &&
      filter.type !== 'undefined'
    ) {
      where['time'] = filter.type.toUpperCase();
    }

    if (filter.costPerHour) {
      where['costPerHour'] = {};
      if (filter.costPerHour.min) {
        where['costPerHour']['gte'] =
          filter.costPerHour.min;
      }
      if (filter.costPerHour.max) {
        where['costPerHour']['lte'] =
          filter.costPerHour.max;
      }
    }

    return this.prisma.work.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where,
      include: {
        address: true,
        skillType: true,
        user: true,
      },
    });
  }

  getUserWorks(userId: number) {
    return this.prisma.work.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        address: true,
        skillType: true,
        user: true,
      },
    });
  }

  async createWork(
    userId: number,
    dto: CreateWorkDto,
  ) {
    const work = this.prisma.work.create({
      data: {
        title: dto.title,
        costPerHour: dto.costPerHour,
        term: dto.term,
        time: dto.time,
        description: dto.description,
        totalTime: dto.totalTime,
        skillType: {
          connect: {
            id: dto.skillTypeId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        address: {
          create: dto.address,
        },
      },
      include: {
        address: true,
        user: true,
        skillType: true,
        contract: true,
      },
    });
    return work;
  }

  async getWorkById(workId: number) {
    const work = await this.prisma.work.findFirst(
      {
        where: {
          id: workId,
        },
        include: {
          address: true,
          skillType: true,
          user: true,
        },
      },
    );
    return work;
  }

  async editWorkById(
    workId: number,
    dto: EditWorkDto,
  ) {
    const Work = await this.prisma.work.update({
      data: dto,
      where: {
        id: workId,
      },
      include: {
        address: true,
        skillType: true,
        user: true,
      },
    });
    return Work;
  }

  async deleteWorkById(workId: number) {
    await this.prisma.work.delete({
      where: {
        id: workId,
      },
    });
  }
}
