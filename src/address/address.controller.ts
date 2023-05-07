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
import { AddressService } from './address.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateAddressDto,
  EditAddressDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('addresses')
export class AddressController {
  constructor(
    private addressService: AddressService,
  ) {}

  @Get()
  getAddresses() {
    return this.addressService.getAddresses();
  }

  @Post()
  createAddress(@Body() dto: CreateAddressDto) {
    return this.addressService.createAddress(dto);
  }

  @Get(':id')
  getAddressById(
    @Param('id', ParseIntPipe) addressId: number,
  ) {
    return this.addressService.getAddressById(
      addressId,
    );
  }

  @Patch(':id')
  editAdddressById(
    @Param('id', ParseIntPipe) addressId: number,
    @Body() dto: EditAddressDto,
  ) {
    return this.addressService.editAdddressById(
      addressId,
      dto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAdddressById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) addressId: number,
  ) {
    return this.addressService.deleteAdddressById(
      addressId,
    );
  }
}
