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

    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const result = address.filter((item) => {
      const earthRadius = 6371; // Raio médio da Terra em metros
      const lat1 = toRadians(lat);
      const lon1 = toRadians(lng);

      const lat2 = toRadians(item.lat);
      const lon2 = toRadians(item.lng);

      const deltaLat = toRadians(lat2 - lat1);
      const deltaLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(deltaLat / 2) *
          Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(deltaLon / 2) *
          Math.sin(deltaLon / 2);

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a),
        );
      const distance = earthRadius * c;

      return distance <= 2; //radar = 2
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
