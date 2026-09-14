import { DynamicModule, Module } from '@nestjs/common';
import {
  SpotifyAsyncOptions,
  SpotifyOptions,
  SpotifyOptionsSymbol,
} from './interfaces/spotify-options.interface.js';
import { HttpModule } from '@nestjs/axios';
import { SpotifyService } from './spotify.service.js';

@Module({})
export class SpotifyModule {
  static forRoot(options: SpotifyOptions): DynamicModule {
    return {
      module: SpotifyModule,
      imports: [HttpModule],
      providers: [
        SpotifyService,
        {
          provide: SpotifyOptionsSymbol,
          useValue: options,
        },
      ],
      exports: [SpotifyService],
      global: true,
    };
  }

  static forRootAsync(options: SpotifyAsyncOptions): DynamicModule {
    return {
      module: SpotifyModule,
      imports: [HttpModule, ...(options.imports ?? [])],
      providers: [
        SpotifyService,
        {
          provide: SpotifyOptionsSymbol,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
      ],
      exports: [SpotifyService],
      global: true,
    };
  }
}
