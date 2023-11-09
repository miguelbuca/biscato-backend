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
import { FollowService } from './follow.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateFollowDto,
  EditFollowDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('follow')
export class FollowController {
  constructor(
    private followService: FollowService,
  ) {}

  @Get()
  getFollows() {
    return this.followService.getFollows();
  }

  @Get('me')
  getUserFollows(@GetUser('id') userId: number) {
    return this.followService.getUserFollows(
      userId,
    );
  }

  @Get('me/count')
  getUserFollowsCount(
    @GetUser('id') userId: number,
  ) {
    return this.followService.getUserFollowsCount(
      userId,
    );
  }

  @Post()
  createFollow(
    @GetUser('id') userId: number,
    @Body() dto: CreateFollowDto,
  ) {
    return this.followService.createFollow(
      userId,
      dto,
    );
  }

  @Get(':id')
  getFollowById(
    @Param('id', ParseIntPipe)
    FollowId: number,
  ) {
    return this.followService.getFollowById(
      FollowId,
    );
  }

  @Patch(':id')
  editFollowById(
    @Param('id', ParseIntPipe)
    FollowId: number,
    @Body() dto: EditFollowDto,
  ) {
    return this.followService.editFollowById(
      FollowId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteFollowById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    FollowId: number,
  ) {
    return this.followService.deleteFollowById(
      FollowId,
    );
  }
}
