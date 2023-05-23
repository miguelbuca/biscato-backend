import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    return user;
  }
  async getSkills(
    userId: number
  ) {
    const skills = await this.prisma.skill.findMany({
      where: {
        userId
      },
      include: {
        skillType: true
      }
    });
    return skills;
  }
}
