import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({
    description: 'Unique movie identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'Inception',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Movie description',
    example:
      'A thief who steals corporate secrets through dream-sharing technology.',
  })
  description: string | null;

  @ApiProperty({
    description: 'Year when the movie was released',
    example: 2010,
  })
  releaseYear: number;

  @ApiProperty({
    description: 'Movie rating',
    example: 8.8,
  })
  rating: number;

  @ApiProperty({
    description: 'Whether the movie is available',
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Movie genre',
    example: 'DRAMA',
    enum: ['ACTION', 'COMEDY', 'DRAMA', 'HORROR'],
  })
  genre: string;

  @ApiPropertyOptional({
    description: 'Unique identifier of the movie poster',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  posterId: string | null;

  @ApiProperty({
    description: 'Movie creation date',
    example: '2026-09-10T12:00:00.000Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the movie was last updated',
    example: '2026-09-10T12:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: Date;
}
