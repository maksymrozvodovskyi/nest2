import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { ArtistDto } from '../src/artist/dto/artist.dto.js';

const dto: ArtistDto = {
  name: 'Post Malone',
  genre: 'Pop',
};

describe('Artist Controller (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.artist.deleteMany();
    await app.close();
  });

  it('POST /artist - should create artist', async () => {
    const response = await request(app.getHttpServer()).post('/artist').send(dto).expect(201);

    expect(response.body).toMatchObject(dto);
    expect(response.body).toHaveProperty('id');
  });

  it('Get /artist/:id - should return 404 if artist not found', async () => {
    await request(app.getHttpServer()).get('/artist/not-existing-id').expect(404);
  });

  it('GET /artist/:id - should return one artist by id', async () => {
    const created = await request(app.getHttpServer()).post('/artist').send(dto).expect(201);

    const artistId = created.body.id;

    const response = await request(app.getHttpServer())
      .get(`/artist/${artistId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: artistId,
      name: dto.name,
      genre: dto.genre,
    });
  });
});
