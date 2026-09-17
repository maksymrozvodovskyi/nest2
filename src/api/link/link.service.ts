import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service.js';
import { CreateLinkDto } from './dto/create-link.dto.js';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateLinkDto, userId: string) {
    const { originalUrl } = dto;

    const shortCode = randomBytes(5).toString('hex');

    const link = await this.prismaService.link.create({
      data: {
        originalUrl,
        shortCode,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const shortUrl = `${this.configService.getOrThrow<string>('APP_URL')}/${link.shortCode}`;

    return {
      url: shortUrl,
    };
  }

  async delete(id: string, userId: string) {
    const link = await this.prismaService.link.findUnique({
      where: {
        id,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    if (link.userId !== userId) {
      throw new ForbiddenException('You can delete only your own links');
    }

    await this.prismaService.link.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Link deleted successfully',
    };
  }
}
