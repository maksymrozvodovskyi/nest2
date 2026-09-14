import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../generated/prisma/client.js';
import { ArtistDto } from './dto/artist.dto.js';
import { ArtistService } from './artist.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';

const artistid = uuidv4();

const artists: Artist[] = [
  {
    id: artistid,
    name: 'Qew',
    genre: 'Pop',
  },
  {
    id: uuidv4(),
    name: 'Qeqweqw',
    genre: 'Pop',
  },
  {
    id: uuidv4(),
    name: 'zxczxczxc',
    genre: 'Rap',
  },
];

const artist: Artist = artists[0];

const dto: ArtistDto = {
  name: artist.name,
  genre: artist.genre,
};

const db = {
  artist: {
    findMany: jest.fn<() => Promise<Artist[]>>().mockResolvedValue(artists),
    findUnique: jest.fn<() => Promise<Artist>>().mockResolvedValue(artist),
    create: jest.fn<() => Promise<Artist>>().mockResolvedValue(artist),
  },
};

describe('Artist Service', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await service.findAll();
    expect(result).toEqual(artists);
  });

  it('should return a single artist by id', async () => {
    const result = await service.findOne(artistid);
    expect(result).toEqual(artist);
  });

  it('should create a new artist', async () => {
    const result = await service.create(dto);
    expect(result).toEqual(artist);
  });
});
