import { Controller, Get, Post, Query, Body, Headers } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  findAll(@Query() query: any) {
    return `Films with parameters ${JSON.stringify(query)}`;
  }

  @Post()
  create(@Body('title') body: { title: string; genre: string }) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers('user-agent') userAgent: string) {
    return { 'User-Agent': userAgent };
  }
}
