import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LinkService } from './link.service.js';
import { Authorization } from '../../common/decorators/authorization.decorator.js';
import { CreateLinkDto } from './dto/create-link.dto.js';
import { Authorized } from '../../common/decorators/authorized.decoratod.js';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Authorization()
  @Post()
  async create(@Body() dto: CreateLinkDto, @Authorized('id') id: string) {
    return await this.linkService.create(dto, id);
  }

  @Authorization()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.linkService.delete(id);
  }
}
