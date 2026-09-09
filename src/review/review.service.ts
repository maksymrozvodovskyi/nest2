import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Review } from '../generated/prisma/client.js';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return review;
  }
}
