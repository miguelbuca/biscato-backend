import { Module } from '@nestjs/common';
import { PortfolioItemController } from './portfolio-item.controller';
import { PortfolioItemService } from './portfolio-item.service';

@Module({
  controllers: [PortfolioItemController],
  providers: [PortfolioItemService]
})
export class PortfolioItemModule {}
