import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe.js';
import { AuthGuard } from './common/guards/auth.guard.js';
import { UserAgent } from './common/decorators/user-agent.decorator.js';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Create a movie title',
  })
  @ApiResponse({
    status: 201,
    description: 'Movie title created',
  })
  @ApiBody({
    schema: {
      type: 'string',
      example: 'Inception',
    },
  })
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body() title: string) {
    return `Movie ${title}`;
  }

  @ApiOperation({
    summary: 'Get current user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() UserAgent: string) {
    return {
      id: 1,
      UserAgent,
    };
  }
}
