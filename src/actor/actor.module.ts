import { Module } from '@nestjs/common';
import { ActorService } from './actor.service.js';
import { ActorController } from './actor.controller.js';

@Module({
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
