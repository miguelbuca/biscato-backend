import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSkillTypeDto,
  EditSkillTypeDto,
} from './dto';

@Injectable()
export class SkillTypeService {
  constructor(private prisma: PrismaService) {}
  getSkillTypees() {
    return this.prisma.skillType.findMany();
  }

  getUserSkillTypes(userId: number) {
    return this.prisma.skillType.findMany({
      where: {
        skills: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async createSkillType(dto: CreateSkillTypeDto) {
    const SkillType =
      this.prisma.skillType.create({
        data: dto,
      });
    return SkillType;
  }

  async getSkillTypeById(skillTypeId: number) {
    const SkillType =
      await this.prisma.skillType.findFirst({
        where: {
          id: skillTypeId,
        },
      });
    return SkillType;
  }

  async editSkillTypeById(
    skillTypeId: number,
    dto: EditSkillTypeDto,
  ) {
    const SkillType =
      await this.prisma.skillType.update({
        data: dto,
        where: {
          id: skillTypeId,
        },
      });
    return SkillType;
  }

  async deleteSkillTypeById(skillTypeId: number) {
    await this.prisma.skillType.delete({
      where: {
        id: skillTypeId,
      },
    });
  }
}
