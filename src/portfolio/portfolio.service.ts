import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePortfolioDto,
  EditPortfolioDto,
} from './dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}
  getPortfolios() {
    return this.prisma.portfolio.findMany();
  }

  async createPortfolio(
    userId: number,
    dto: CreatePortfolioDto,
  ) {
    const person =
      await this.prisma.person.findUnique({
        where: {
          id: dto.personId,
        },
      });

    if (person.userId !== userId)
      throw new ForbiddenException(
        'Account not found',
      );

    const portfolio =
      this.prisma.portfolio.create({
        data: {
          ...dto,
          personId: person.id,
        },
      });
    return portfolio;
  }

  getUserPortfoliosCount(userId: number) {
    return this.prisma.portfolio.count({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'ACTIVE',
      },
    });
  }

  async getPortfolioById(portfolioId: number) {
    const portfolio =
      await this.prisma.portfolio.findFirst({
        where: {
          id: portfolioId,
        },
        include: {
          person: true,
        },
      });
    return portfolio;
  }

  async editPortfolioById(
    portfolioId: number,
    dto: EditPortfolioDto,
  ) {
    const Portfolio =
      await this.prisma.portfolio.update({
        data: {
          ...dto,
        },
        where: {
          id: portfolioId,
        },
      });
    return Portfolio;
  }

  async deletePortfolioById(PortfolioId: number) {
    await this.prisma.portfolio.delete({
      where: {
        id: PortfolioId,
      },
    });
  }
}
