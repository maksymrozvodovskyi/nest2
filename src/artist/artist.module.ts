import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service.js';
import { ArtistController } from './artist.controller.js';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
