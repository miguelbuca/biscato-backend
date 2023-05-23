import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import {
  CreateAddressDto,
  EditAddressDto,
} from 'src/address/dto';
import {
  CreateSkillTypeDto,
  EditSkillTypeDto,
} from 'src/skill-type/dto';
import { CreateSkillDto } from 'src/skill/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@gmail.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            passowrd: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            passowrd: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .stores('userId', 'id')
          .expectStatus(200);
      });
    });
    describe('Get user skills', () => {
      it('should get user skills', () => {
        return pactum
          .spec()
          .get('/users/skills')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .stores('userId', 'id')
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          email: 'test-edited@gmail.com',
          firstName: 'Test',
          lastName: 'Edited',
        };

        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
    });
  });

  describe('Address', () => {
    const dto: CreateAddressDto = {
      name: 'Luanda',
      lat: -41.235689,
      lng: 4.1564554,
    };
    describe('Get empity addresses', () => {
      it('should get address', () => {
        return pactum
          .spec()
          .get('/addresses')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create address', () => {
      it('should create address', () => {
        return pactum
          .spec()
          .post('/addresses')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('addressId', 'id');
      });
    });
    describe('Get addresses', () => {
      it('should get address', () => {
        return pactum
          .spec()
          .get('/addresses')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Get address by id', () => {
      it('should get address', () => {
        return pactum
          .spec()
          .get('/addresses/{id}')
          .withPathParams('id', '$S{addressId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{addressId}');
      });
    });
    describe('Edit address by id', () => {
      const dto: EditAddressDto = {
        name: 'Luanda-edited',
        lat: -1.1235689,
        lng: 48.9564554,
        description: 'my description',
      };
      it('should edit address by id', () => {
        return pactum
          .spec()
          .patch('/addresses/{id}')
          .withPathParams('id', '$S{addressId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.lat)
          .expectBodyContains(dto.lng)
          .expectBodyContains(dto.description);
      });
    });
    describe('Delete address by id', () => {
      it('should delete address by id', () => {
        return pactum
          .spec()
          .delete('/addresses/{id}')
          .withPathParams('id', '$S{addressId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(204);
      });
      it('should get empity address', () => {
        return pactum
          .spec()
          .get('/addresses/{id}')
          .withPathParams('id', '$S{addressId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody('');
      });
    });
  });

  describe('SkillType', () => {
    const dto: CreateSkillTypeDto = {
      name: 'Developer',
    };
    describe('Get empity skillType', () => {
      it('should get skillType', () => {
        return pactum
          .spec()
          .get('/skill-types')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create skillType', () => {
      it('should create skillType', () => {
        return pactum
          .spec()
          .post('/skill-types')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('skillTypeId', 'id');
      });
    });
    describe('Get skillType', () => {
      it('should get skillType', () => {
        return pactum
          .spec()
          .get('/skill-types')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Get skillType by id', () => {
      it('should get skillType', () => {
        return pactum
          .spec()
          .get('/skill-types/{id}')
          .withPathParams('id', '$S{skillTypeId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{skillTypeId}');
      });
    });
    describe('Edit skillType by id', () => {
      const dto: EditSkillTypeDto = {
        name: 'Developer-edited',
      };
      it('should edit skillType by id', () => {
        return pactum
          .spec()
          .patch('/skill-types/{id}')
          .withPathParams('id', '$S{skillTypeId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    });
    describe('Delete skillType by id', () => {
      it('should delete skillType by id', () => {
        return pactum
          .spec()
          .delete('/skill-types/{id}')
          .withPathParams('id', '$S{skillTypeId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(204);
      });
      it('should get empity skillType', () => {
        return pactum
          .spec()
          .get('/skill-types/{id}')
          .withPathParams('id', '$S{skillTypeId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody('');
      });
    });
    describe('Create more one skillType', () => {
      it('should create skillType', () => {
        return pactum
          .spec()
          .post('/skill-types')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('skillTypeId', 'id');
      });
    });
  });
  describe('Skill', () => {
    describe('Get empity skill', () => {
      it('should get skill', () => {
        return pactum
          .spec()
          .get('/skills')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create skill', () => {
      it('should create skill', () => {
        return pactum
          .spec()
          .post('/skills')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            name: 'Test',
            skillTypeId: '$S{skillTypeId}',
          })
          .inspect()
          .expectStatus(201)
          .stores('skillId', 'id');
      });
    });
    describe('Get skill', () => {
      it('should get skill', () => {
        return pactum
          .spec()
          .get('/skills')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Get skill by id', () => {
      it('should get skill', () => {
        return pactum
          .spec()
          .get('/skills/{id}')
          .withPathParams('id', '$S{skillId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{skillId}');
      });
    });
    describe('Edit skill by id', () => {
      const dto: EditSkillTypeDto = {
        name: 'Developer-edited',
      };
      it('should edit skillType by id', () => {
        return pactum
          .spec()
          .patch('/skills/{id}')
          .withPathParams('id', '$S{skillId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    });
    describe('Delete skill by id', () => {
      it('should delete skill by id', () => {
        return pactum
          .spec()
          .delete('/skills/{id}')
          .withPathParams('id', '$S{skillId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });
      it('should get empity skill', () => {
        return pactum
          .spec()
          .get('/skills/{id}')
          .withPathParams('id', '$S{skillId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody('');
      });
    });
  });
});
