import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { LinkModule } from './link/link.module.js';

@Module({
  imports: [AuthModule, LinkModule],
})
export class ApiModule {}
