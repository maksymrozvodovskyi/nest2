import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Inception',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Year when the movie was released',
    example: 2010,
    minimum: 1888,
    maximum: new Date().getFullYear(),
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: 'URL of the movie poster image',
    example: 'https://example.com/posters/inception.jpg',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'IDs of actors participating in the movie',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
