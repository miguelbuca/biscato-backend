import { Module } from '@nestjs/common';
import { SkillTypeService } from './skill-type.service';
import { SkillTypeController } from './skill-type.controller';

@Module({
  controllers: [SkillTypeController],
  providers: [SkillTypeService]
})
export class SkillTypeModule {}
