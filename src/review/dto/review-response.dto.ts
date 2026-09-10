import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponseDto {
  @ApiProperty({
    description: 'Unique review identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Review text',
    example: 'A brilliantly directed science-fiction movie.',
  })
  text: string;

  @ApiProperty({
    description: 'Movie rating from 0 to 10',
    example: 9.5,
    minimum: 0,
    maximum: 10,
  })
  rating: number;

  @ApiProperty({
    description: 'ID of the reviewed movie',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  movieId: string;

  @ApiProperty({
    description: 'Review creation date',
    example: '2026-09-10T12:00:00.000Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the review was last updated',
    example: '2026-09-10T12:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: Date;
}
