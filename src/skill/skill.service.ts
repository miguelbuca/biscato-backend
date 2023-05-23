import {
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSkillDto,
  EditSkillDto,
} from './dto';

@UseGuards(JwtGuard)
@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}
  getSkilles() {
    return this.prisma.skill.findMany({
      include: {
        skillType: true,
      },
    });
  }

  async createSkill(
    userId: number,
    dto: CreateSkillDto,
  ) {
    const Skill = this.prisma.skill.create({
      data: {
        name: dto.name,
        description: dto.description,
        user: {
          connect: {
            id: userId,
          },
        },
        skillType: {
          connect: {
            id: dto.skillTypeId,
          },
        },
      },
      include: {
        skillType: true,
      },
    });
    return Skill;
  }

  async getSkillById(skillId: number) {
    const Skill =
      await this.prisma.skill.findFirst({
        where: {
          id: skillId,
        },
      });
    return Skill;
  }

  async editSkillById(
    userId: number,
    skillId: number,
    dto: EditSkillDto,
  ) {
    const Skill = await this.prisma.skill.update({
      data: dto,
      where: {
        id: skillId,
      },
    });
    return Skill;
  }

  async deleteSkillById(skillId: number) {
    await this.prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
  }
}
