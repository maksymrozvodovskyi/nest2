import { Module } from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { MovieController } from './movie.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity.js';
import { ActorEntity } from '../actor/entities/actor.entity.js';
import { MoviePosterEntity } from './entities/poster.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, MoviePosterEntity, ActorEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
