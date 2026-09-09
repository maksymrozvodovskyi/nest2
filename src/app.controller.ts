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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body() title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAgent() UserAgent: string) {
    return {
      id: 1,
      UserAgent,
    };
  }
}
