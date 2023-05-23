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
import { SkillTypeService } from './skill-type.service';
import { CreateSkillTypeDto, EditSkillTypeDto } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('skill-types')
export class SkillTypeController {
    constructor(
        private skillTypeService: SkillTypeService,
      ) {}
    
      @Get()
      getSkillTypees() {
        return this.skillTypeService.getSkillTypees();
      }

      
      @Get('me')
      getUserSkills(@GetUser("id") userId: number) {
        return this.skillTypeService.getUserSkillTypes(userId);
      }
    
      @Post()
      createSkillType(@Body() dto: CreateSkillTypeDto) {
        return this.skillTypeService.createSkillType(dto);
      }
    
      @Get(':id')
      getSkillTypeById(
        @Param('id', ParseIntPipe) skillTypeId: number,
      ) {
        return this.skillTypeService.getSkillTypeById(
          skillTypeId,
        );
      }
    
      @Patch(':id')
      editSkillTypeById(
        @Param('id', ParseIntPipe) skillTypeId: number,
        @Body() dto: EditSkillTypeDto,
      ) {
        return this.skillTypeService.editSkillTypeById(
          skillTypeId,
          dto,
        );
      }
      @HttpCode(HttpStatus.NO_CONTENT)
      @Delete(':id')
      deleteSkillTypeById(
        @Param('id', ParseIntPipe) skillTypeId: number,
      ) {
        return this.skillTypeService.deleteSkillTypeById(
          skillTypeId,
        );
      }
}
