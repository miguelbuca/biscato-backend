import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateApplicationDto, EditApplicationDto } from './dto';
import { ApplicationService } from './application.service';

@UseGuards(JwtGuard)
@Controller('applications')
export class ApplicationController {
    constructor(
        private applicationService: ApplicationService,
      ) {}
    
      @Get()
      getApplications() {
        return this.applicationService.getApplications();
      }

      @Get('me')
      getUserApplications(@GetUser("id") userId: number) {
        return this.applicationService.getUserApplications(userId);
      }

      @Get('works/:id')
      getWorkApplications(@Param('id', ParseIntPipe) workId: number) {
        return this.applicationService.getWorkApplications(workId);
      }
    
      @Post()
      createApplication( @GetUser('id') userId: number,@Body() dto: CreateApplicationDto) {
        return this.applicationService.createApplication(userId,dto);
      }
    
      @Get(':id')
      getApplicationById(
        @Param('id', ParseIntPipe) applicationId: number,
      ) {
        return this.applicationService.getApplicationById(
          applicationId,
        );
      }
    
      @Patch(':id')
      editAdddressById(
        @Param('id', ParseIntPipe) ApplicationId: number,
        @Body() dto: EditApplicationDto,
      ) {
        return this.applicationService.editAdddressById(
          ApplicationId,
          dto,
        );
      }
      @HttpCode(HttpStatus.NO_CONTENT)
      @Delete(':id')
      deleteAdddressById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) applicationId: number,
      ) {
        return this.applicationService.deleteAdddressById(
          applicationId,
        );
      }
}
