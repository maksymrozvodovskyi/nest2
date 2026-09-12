import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../generated/prisma/client.js';
import { Request } from 'express';

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;

  const user = request.user as User | undefined;
  return data ? user?.[data] : user;
});
