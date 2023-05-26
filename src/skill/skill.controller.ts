import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto, EditSkillDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('skills')
export class SkillController {
    constructor(
        private skillService: SkillService,
      ) {}
    
      @Get()
      getSkills() {
        return this.skillService.getSkills();
      }

      @Get('me')
      getUserSkills(@GetUser("id") userId: number) {
        return this.skillService.getUserSkills(userId);
      }
    
      @Post()
      createSkill(@GetUser("id") userId: number,@Body() dto: CreateSkillDto) {
        return this.skillService.createSkill(userId,dto);
      }
    
      @Get(':id')
      getSkillById(
        @Param('id', ParseIntPipe) skillId: number,
      ) {
        return this.skillService.getSkillById(
          skillId,
        );
      }
    
      @Patch(':id')
      editSkillById(@GetUser("id") userId: number,
        @Param('id', ParseIntPipe) skillId: number,
        @Body() dto: EditSkillDto,
      ) {
        return this.skillService.editSkillById(
          userId,
          skillId,
          dto,
        );
      }
      @HttpCode(HttpStatus.NO_CONTENT)
      @Delete(':id')
      deleteSkillById(
        @Param('id', ParseIntPipe) skillId: number,
      ) {
        return this.skillService.deleteSkillById(
          skillId,
        );
      }
}
