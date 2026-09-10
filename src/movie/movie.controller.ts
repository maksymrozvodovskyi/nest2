import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { MovieDto } from './dto/movie.dto.js';
import { MovieResponseDto } from './dto/movie-response.dto.js';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get list of movies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movies found',
    type: [MovieResponseDto],
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie found',
    type: MovieResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'Create a movie',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movie created',
    type: MovieResponseDto,
  })
  @ApiBody({ type: MovieDto })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'Update a movie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: MovieDto })
  @Put(':id')
  update(@Body() dto: MovieDto, @Param('id') id: string) {
    return this.movieService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a movie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movie not found',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
