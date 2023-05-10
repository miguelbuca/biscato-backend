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

@UseGuards(JwtGuard)
@Controller('skill-types')
export class SkillTypeController {
    constructor(
        private skillTypeService: SkillTypeService,
      ) {}
    
      @Get()
      getskillTypees() {
        return this.skillTypeService.getSkillTypees();
      }
    
      @Post()
      createskillType(@Body() dto: CreateSkillTypeDto) {
        return this.skillTypeService.createSkillType(dto);
      }
    
      @Get(':id')
      getskillTypeById(
        @Param('id', ParseIntPipe) skillTypeId: number,
      ) {
        return this.skillTypeService.getSkillTypeById(
          skillTypeId,
        );
      }
    
      @Patch(':id')
      editAdddressById(
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
      deleteAdddressById(
        @Param('id', ParseIntPipe) skillTypeId: number,
      ) {
        return this.skillTypeService.deleteSkillTypeById(
          skillTypeId,
        );
      }
}
