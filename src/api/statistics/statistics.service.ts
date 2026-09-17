import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service.js';
import { UAParser } from 'ua-parser-js';
import { lookup } from 'node:dns';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;
  constructor(private readonly prismaService: PrismaService) {
    this.parser = new UAParser();
  }

  private async getClicks(linkId: string) {
    const clicks = await this.prismaService.click.findMany({
      where: {
        linkId,
      },
    });

    return clicks;
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce(
      (acc, clicks) => {
        const { browser } = this.getBrowserByUserAgent(clicks.userAgent);

        if (acc[browser]) {
          acc[browser] += 1;
        } else {
          acc[browser] = 1;
        }

        return acc;
      },
      {} as Record<string, number>,
    );

    return stats;
  }

  async getCountryStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = (await Promise.all(
      clicks.map(async (click) => this.getCountryByIp(click.ipAdress)),
    )).reduce(
      (acc, country) => {

        if (acc[country]) {
          acc[country] += 1;
        } else {
          acc[country] = 1;
        }

        return acc;
      },
      {} as Record<string, number>,
    );

    return stats;
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);

    const result = this.parser.getResult();

    return {
      browser: result.browser.name ?? '',
    };
  }

  private async getCountryByIp(ip: string): Promise<string> {
    return new Promise((resolve) => {
      lookup(ip, (error, address) => {
        if (error) {
          resolve('Unknown');
          return;
        }

        resolve(address);
      });
    });
  }
}
