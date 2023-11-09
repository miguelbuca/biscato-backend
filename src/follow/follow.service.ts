import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateFollowDto,
  EditFollowDto,
} from './dto';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}
  getFollows() {
    return this.prisma.follow.findMany();
  }

  async createFollow(
    personId: number,
    dto: CreateFollowDto,
  ) {
    const follow = this.prisma.follow.create({
      data: {
        followerId: dto.personId,
        personId,
      },
    });
    return follow;
  }

  getUserFollows(personId: number) {
    return this.prisma.follow.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        personId,
      },
    });
  }

  getUserFollowsCount(personId: number) {
    return this.prisma.follow.count({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        personId,
        status: 'ACTIVE',
      },
    });
  }

  async getFollowById(followId: number) {
    const follow =
      await this.prisma.follow.findFirst({
        where: {
          id: followId,
        },
      });
    return follow;
  }

  async editFollowById(
    followId: number,
    dto: EditFollowDto,
  ) {
    const follow =
      await this.prisma.follow.update({
        data: {
          ...dto,
        },
        where: {
          id: followId,
        },
      });
    return follow;
  }

  async deleteFollowById(followId: number) {
    await this.prisma.follow.delete({
      where: {
        id: followId,
      },
    });
  }
}
