import { ConfigService } from '@nestjs/config';
import { SpotifyOptions } from '../spotify/interfaces/spotify-options.interface.js';

export function getSpotifyConfig(configService: ConfigService): SpotifyOptions {
  return {
    client_id: configService.getOrThrow<string>('SPOTIFY_CLIENT_ID'),
    clientSecret: configService.getOrThrow<string>('SPOTIFY_CLIENT_SECRET'),
  };
}
