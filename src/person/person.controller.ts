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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PersonService } from './person.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreatePersonDto,
  EditPersonDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/images/avatar',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          const filename = `${uniqueSuffix}${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  createperson(
    @GetUser('id') userId: number,
    @Body() dto: CreatePersonDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /.(jpg|jpeg|png|gif)$/,
        })
        /*.addMaxSizeValidator({
          maxSize: 1000,
        })*/
        .build({
          errorHttpStatusCode:
            HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.personService.createPerson(
      userId,
      {
        ...dto,
        avatar: file.path,
      },
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
