import { Injectable } from '@nestjs/common';
import {
  CreateAddressDto,
  EditAddressDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  convertDistance,
  getDistance,
  isPointWithinRadius,
} from 'geolib';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  getAddresses() {
    return this.prisma.address.findMany();
  }
  async getAdsressNearby(
    lat: number,
    lng: number,
  ) {
    const address =
      await this.prisma.address.findMany({
        where: {
          work: {
            status: 'ACTIVE',
          },
          status: 'ACTIVE',
        },
        include: {
          work: {
            include: {
              skillType: {
                include: {
                  skills: true,
                },
              },
            },
          },
        },
      });

    return address;

    const result = address.filter((item) => {
      return isPointWithinRadius(
        {
          lat,
          lng,
        },
        {
          lat: item.lat,
          lng: item.lng,
        },
        1000,
      );
    });

    return result;
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
