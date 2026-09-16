import { Module } from '@nestjs/common';
import { LinkService } from './link.service.js';
import { LinkController } from './link.controller.js';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
