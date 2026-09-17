import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module.js';
import { LinkService } from './link.service.js';
import { LinkController } from './link.controller.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
