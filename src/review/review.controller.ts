import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewResponseDto } from './dto/review-response.dto.js';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'Create a review',
  })
  @ApiResponse({
    status: 201,
    description: 'Review created',
    type: ReviewResponseDto,
  })
  @ApiBody({ type: CreateReviewDto })
  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }
}
