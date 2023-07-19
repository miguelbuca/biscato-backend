import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PersonService } from './person.service';
import { GetUser } from 'src/auth/decorator';
import { CreatePersonDto, EditPersonDto } from './dto';

@UseGuards(JwtGuard)
@Controller('persons')
export class PersonController {
  constructor(
    private personService: PersonService,
  ) {}

  @Get()
  getpersons() {
    return this.personService.getPersons();
  }

  @Post()
  createperson(
    @GetUser('id') userId: number,
    @Body() dto: CreatePersonDto,
  ) {
    return this.personService.createPerson(
      userId,
      dto,
    );
  }

  @Get(':id')
  getpersonById(
    @Param('id', ParseIntPipe) personId: number,
  ) {
    return this.personService.getPersonById(
      personId,
    );
  }

  @Patch(':id')
  editpersonById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) personId: number,
    @Body() dto: EditPersonDto,
  ) {
    return this.personService.editPersonById(
      personId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletepersonById(
    @Param('id', ParseIntPipe) personId: number,
  ) {
    return this.personService.deletePersonById(
      personId,
    );
  }
}
