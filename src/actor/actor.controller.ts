import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActorService } from './actor.service.js';
import { CreateActorDto } from './dto/create-actor.dto.js';

@ApiTags('Actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiOperation({
    summary: 'Create an actor',
  })
  @ApiResponse({
    status: 201,
    description: 'Actor created',
  })
  @ApiBody({ type: CreateActorDto })
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }
}
