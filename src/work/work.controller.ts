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
import { JwtGuard } from 'src/auth/guard';
import { WorkService } from './work.service';
import { GetUser } from 'src/auth/decorator';
import { WorkType } from '@prisma/client';
import {
  CreateWorkDto,
  EditWorkDto,
  FilterWorkDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('works')
export class WorkController {
  constructor(private workservice: WorkService) {}

  @Get(
    '/:skillType?/:type?/:minCostPerHour?/:maxCostPerHour?',
  )
  getWorks(
    @Param('skillType')
    skillType: string,
    @Param('type')
    type: WorkType,
    @Param('minCostPerHour')
    minCostPerHour: number,
    @Param('maxCostPerHour')
    maxCostPerHour: number,
  ) {
    return this.workservice.getWorks({
      skillType,
      type,
      costPerHour:
        maxCostPerHour || minCostPerHour
          ? {
              max: parseFloat(
                maxCostPerHour?.toString?.() ||
                  '0',
              ),
              min: parseFloat(
                minCostPerHour?.toString?.() ||
                  '0',
              ),
            }
          : undefined,
    });
  }

  @Get('me')
  getUserWorks(@GetUser('id') userId: number) {
    return this.workservice.getUserWorks(userId);
  }

  @Post()
  createWork(
    @GetUser('id') userId: number,
    @Body() dto: CreateWorkDto,
  ) {
    return this.workservice.createWork(
      userId,
      dto,
    );
  }

  @Get(':id')
  getWorkById(
    @Param('id', ParseIntPipe) WorkId: number,
  ) {
    return this.workservice.getWorkById(WorkId);
  }

  @Patch(':id')
  editWorkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) WorkId: number,
    @Body() dto: EditWorkDto,
  ) {
    return this.workservice.editWorkById(
      WorkId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteWorkById(
    @Param('id', ParseIntPipe) WorkId: number,
  ) {
    return this.workservice.deleteWorkById(
      WorkId,
    );
  }
}
