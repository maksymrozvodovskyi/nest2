import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { MovieDto } from './dto/movie.dto.js';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(+id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Body() dto: MovieDto, @Param('id') id: string) {
    return this.movieService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(+id);
  }
}
