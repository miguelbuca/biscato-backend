import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {
  CreatePortfolioDto,
  EditPortfolioDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
  ) {}

  @Get('person/:id')
  getPersonPortfolio(
    @Param('id', ParseIntPipe) personId: number,
  ) {
    return this.portfolioService.getPersonPortfolio(
      personId,
    );
  }

  @Post()
  createPortfolioItem(
    @GetUser('id') userId: number,
    @Body() dto: CreatePortfolioDto,
  ) {
    return this.portfolioService.createPortfolio(
      userId,
      {
        ...dto,
      },
    );
  }

  @Get(':id')
  getPortfolioById(
    @Param('id', ParseIntPipe)
    portfolioId: number,
  ) {
    return this.portfolioService.getPortfolioById(
      portfolioId,
    );
  }

  @Patch(':id')
  editPortfolioById(
    @Param('id', ParseIntPipe)
    portfolioId: number,
    @Body() dto: EditPortfolioDto,
  ) {
    return this.portfolioService.editPortfolioById(
      portfolioId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePortfolioById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    portfolioId: number,
  ) {
    return this.portfolioService.deletePortfolioById(
      portfolioId,
    );
  }
}
