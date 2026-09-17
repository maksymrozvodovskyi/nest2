import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IS_DEV_ENV } from '../utils/is-dev.util.js';

export const UserAgent = createParamDecorator((_: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;

  return request.headers['user-agent'];
});

export const ClientIp = createParamDecorator((_: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;

  let ip: string | undefined;

  if (IS_DEV_ENV) {
    ip = '178.137.160.1';
  } else if (Array.isArray(request.headers['cf-connecting-ip'])) {
    ip = request.headers['cf-connecting-ip'][0];
  } else if (request.headers['cf-connecting-ip']) {
    ip = request.headers['cf-connecting-ip'];
  } else if (typeof request.headers['x-forwarded-for'] === 'string') {
    ip = request.headers['x-forwarded-for'].split(',')[0];
  } else {
    ip = request.ip;
  }

  return ip;
});
