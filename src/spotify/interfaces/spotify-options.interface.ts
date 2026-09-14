import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const SpotifyOptionsSymbol = Symbol('SPOTIFY_OPTIONS');

export type SpotifyOptions = {
  client_id: string;
  clientSecret: string;
};

export type SpotifyAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<SpotifyOptions>, 'useFactory' | 'inject'>;
