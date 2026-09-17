import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';
import { Authorization } from '../../common/decorators/authorization.decorator.js';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Authorization()
  @Get(':id/browsers')
  async getBrowserStats(@Param('id') id: string) {
    return await this.statisticsService.getBrowserStats(id);
  }

  @Authorization()
  @Get(':id/countries')
  async getCountryStats(@Param('id') id: string) {
    return await this.statisticsService.getBrowserStats(id);
  }
}
