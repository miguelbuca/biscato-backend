import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreatePortfolioItemDto,
  EditPortfolioItemDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioItemService {
  constructor(private prisma: PrismaService) {}
  getPortfolioItems() {
    return this.prisma.portfolioItem.findMany();
  }

  async createPortfolioItem(
    userId: number,
    dto: CreatePortfolioItemDto,
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

    const PortfolioItem =
      this.prisma.portfolioItem.create({
        data: {
          ...dto,
        },
      });
    return PortfolioItem;
  }

  getUserPortfolioItems(userId: number) {
    return this.prisma.portfolioItem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        portfolio: {
          person: {
            userId,
          },
        },
      },
      include: {
        portfolio: true,
      },
    });
  }

  getUserPortfolioItemsCount(userId: number) {
    return this.prisma.portfolioItem.count({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        portfolio: {
          person: {
            userId,
          },
        },
        status: 'ACTIVE',
      },
    });
  }

  async getPortfolioItemById(
    PortfolioItemId: number,
  ) {
    const PortfolioItem =
      await this.prisma.portfolioItem.findFirst({
        where: {
          id: PortfolioItemId,
        },
        include: {
          portfolio: true,
        },
      });
    return PortfolioItem;
  }

  async editPortfolioItemById(
    PortfolioItemId: number,
    dto: EditPortfolioItemDto,
  ) {
    const PortfolioItem =
      await this.prisma.portfolioItem.update({
        data: {
          ...dto,
        },
        where: {
          id: PortfolioItemId,
        },
      });
    return PortfolioItem;
  }

  async deletePortfolioItemById(
    PortfolioItemId: number,
  ) {
    await this.prisma.portfolioItem.delete({
      where: {
        id: PortfolioItemId,
      },
    });
  }
}
