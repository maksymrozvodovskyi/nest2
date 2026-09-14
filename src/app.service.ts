import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service.js';

@Injectable()
export class AppService {
  constructor(private readonly spotifyService: SpotifyService) {}

  async getArtist(id: string) {
    const artist = await this.spotifyService.getArtist(id);

    return artist;
  }

  async getAlbum(id: string) {
    const album = await this.spotifyService.getAlbum(id);

    return {
      id: album.id,
      title: album.name,
      releaseDate: album.release_date,
    };
  }

  getHello() {
    return 'Hello World!';
  }
}
