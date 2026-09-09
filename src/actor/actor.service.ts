import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Actor } from '../generated/prisma/client.js';

@Injectable()
export class ActorService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;

    const actor = await this.prismaService.actor.create({
      data: {
        name,
      },
    });

    return actor;
  }
}
