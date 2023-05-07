import { Injectable } from '@nestjs/common';
import {
  CreateAddressDto,
  EditAddressDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  getAddresses() {
    return this.prisma.address.findMany();
  }

  async createAddress(dto: CreateAddressDto) {
    const address = this.prisma.address.create({
      data: dto,
    });
    return address;
  }

  async getAddressById(addressId: number) {
    const address =
      await this.prisma.address.findFirst({
        where: {
          id: addressId,
        },
      });
    return address;
  }

  async editAdddressById(
    addressId: number,
    dto: EditAddressDto,
  ) {
    const address =
      await this.prisma.address.update({
        data: dto,
        where: {
          id: addressId,
        },
      });
    return address;
  }

  async deleteAdddressById(addressId: number) {
    await this.prisma.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
