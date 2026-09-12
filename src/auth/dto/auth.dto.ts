import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}

export class UserResponse {
  @ApiProperty({
    description: 'User identifier',
    example: '2c4d7f3e-2d4c-4e4f-9c22-1d8d8f6f8d12',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'Account creation date', example: '2026-09-12T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Date of the last account update', example: '2026-09-12T12:00:00.000Z' })
  updatedAt: Date;
}
