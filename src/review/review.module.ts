import { Module } from '@nestjs/common';
import { ReviewService } from './review.service.js';
import { ReviewController } from './review.controller.js';
import { MovieService } from '../movie/movie.service.js';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
