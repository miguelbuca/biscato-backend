import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {
  CreatePortfolioItemDto,
  EditPortfolioItemDto,
} from './dto';
import { PortfolioItemService } from './portfolio-item.service';

@UseGuards(JwtGuard)
@Controller('portfolio-item')
export class PortfolioItemController {
  constructor(
    private portfolioItemService: PortfolioItemService,
  ) {}

  @Get()
  getPortfolioItems() {
    return this.portfolioItemService.getPortfolioItems();
  }

  @Get('me')
  getUserPortfolioItems(
    @GetUser('id') userId: number,
  ) {
    return this.portfolioItemService.getUserPortfolioItems(
      userId,
    );
  }

  @Get('me/count')
  getUserPortfolioItemsCount(
    @GetUser('id') userId: number,
  ) {
    return this.portfolioItemService.getUserPortfolioItemsCount(
      userId,
    );
  }

  @Post()
  createPortfolioItem(
    @GetUser('id') userId: number,
    @Body() dto: CreatePortfolioItemDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /.(jpg|jpeg|png|gif)$/,
        })
        .build({
          errorHttpStatusCode:
            HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.portfolioItemService.createPortfolioItem(
      userId,
      {
        ...dto,
        image: file.path,
      },
    );
  }

  @Get(':id')
  getPortfolioItemById(
    @Param('id', ParseIntPipe)
    PortfolioItemId: number,
  ) {
    return this.portfolioItemService.getPortfolioItemById(
      PortfolioItemId,
    );
  }

  @Patch(':id')
  editPortfolioItemById(
    @Param('id', ParseIntPipe)
    portfolioItemId: number,
    @Body() dto: EditPortfolioItemDto,
  ) {
    return this.portfolioItemService.editPortfolioItemById(
      portfolioItemId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePortfolioItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    portfolioItemId: number,
  ) {
    return this.portfolioItemService.deletePortfolioItemById(
      portfolioItemId,
    );
  }
}
