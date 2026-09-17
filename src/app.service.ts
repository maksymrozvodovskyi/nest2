import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './infra/prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLinkByShortCode(code: string) {
    const link = await this.prismaService.link.findUnique({
      where: {
        shortCode: code,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }
}
