import { Injectable } from '@nestjs/common';
import {
  CreateWorkDto,
  EditWorkDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}
  getWorks() {
    return this.prisma.work.findMany({
      include: {
        address: true,
        user: true,
      },
    });
  }

  getUserWorks(userId: number) {
    return this.prisma.work.findMany({
      where: {
        userId,
      },
      include: {
        address: true,
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
        ...dto,
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
          user: true,
        },
      },
    );
    return work;
  }

  async editWorkById(
    userId: number,
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
