import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonDto, EditPersonDto } from './dto';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}
  getPersons() {
    return this.prisma.person.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        addresses: true,
      },
    });
  }

  async createPerson(
    userId: number,
    dto: CreatePersonDto,
  ) {
    const person = this.prisma.person.create({
      data: {
        birthday: dto.birthday,
        nif: dto.nif,
        phoneNumber: dto.phoneNumber,
        avatar: dto.avatar,
        user: {
          connect: {
            id: userId,
          },
        },
        addresses: {
          create: dto.address,
        },
      },
      include: {
        user: true,
      },
    });
    return person;
  }

  async getPersonById(personId: number) {
    const person = await this.prisma.person.findFirst(
      {
        where: {
          id: personId,
        },
        include: {
          user: true,
        },
      },
    );
    return person;
  }

  async editPersonById(
    personId: number,
    dto: EditPersonDto,
  ) {
    const person = await this.prisma.person.update({
      data: {
        ...dto
      },
      where: {
        id: personId,
      },
      include: {
        user: true,
      },
    });
    return person;
  }

  async deletePersonById(personId: number) {
    await this.prisma.person.delete({
      where: {
        id: personId,
      },
    });
  }
}

