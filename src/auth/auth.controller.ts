import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterRequest } from './dto/register.dto.js';
import { LoginRequest } from './dto/login.dto.js';
import { AuthResponse, UserResponse } from './dto/auth.dto.js';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator.js';
import { Authorized } from './decorators/authorized.decoratod.js';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    type: AuthResponse,
    description: 'User registered successfully. The refresh token is set in an HTTP-only cookie.',
  })
  @ApiBadRequestResponse({ description: 'Request body validation failed' })
  @ApiConflictResponse({ description: 'User already exist' })
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterRequest) {
    return await this.authService.register(res, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiOkResponse({
    type: AuthResponse,
    description: 'User logged in successfully. The refresh token is set in an HTTP-only cookie.',
  })
  @ApiBadRequestResponse({ description: 'Request body validation failed' })
  @ApiNotFoundResponse({ description: 'User not found or password is invalid' })
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginRequest) {
    return await this.authService.login(res, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    type: AuthResponse,
    description:
      'Access token refreshed successfully. The refresh token is renewed in an HTTP-only cookie.',
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token cookie is missing, invalid, or expired',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out a user' })
  @ApiOkResponse({ description: 'Refresh token cookie cleared. The response body is empty.' })
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiOkResponse({ type: UserResponse, description: 'Authenticated user returned successfully' })
  @ApiUnauthorizedResponse({ description: 'Access token is missing, invalid, or expired' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async me(@Authorized() user: UserResponse) {
    return user;
  }
}
