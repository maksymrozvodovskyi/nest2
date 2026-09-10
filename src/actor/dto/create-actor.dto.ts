import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty({
    description: 'Actor full name',
    example: 'Leonardo DiCaprio',
  })
  @IsString()
  name: string;
}
