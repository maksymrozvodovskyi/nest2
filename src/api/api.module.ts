import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { LinkModule } from './link/link.module.js';
import { StatisticsModule } from './statistics/statistics.module.js';

@Module({
  imports: [AuthModule, LinkModule, StatisticsModule],
})
export class ApiModule {}
