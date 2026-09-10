import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'A brilliantly directed science-fiction movie.',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Movie rating from 0 to 10',
    example: 9.5,
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    description: 'ID of the movie being reviewed',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID('4')
  movieId: string;
}
