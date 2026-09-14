import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AlbumResponse } from './interfaces/album.interface.js';
import { AuthResponse } from './interfaces/auth-response.interface.js';
import { ArtistResponse } from './interfaces/artist.interface.js';
import { SpotifyOptionsSymbol } from './interfaces/spotify-options.interface.js';
import type { SpotifyOptions } from './interfaces/spotify-options.interface.js';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenEpiry: number = 0;

  constructor(
    @Inject(SpotifyOptionsSymbol) private options: SpotifyOptions,
    private readonly httpService: HttpService,
  ) {}

  public async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<ArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }),
    );

    return response.data;
  }

  public async getAlbum(id: string): Promise<AlbumResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<AlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }),
    );

    return response.data;
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenEpiry) {
      return;
    }

    const creds = Buffer.from(`${this.options.client_id}:${this.options.clientSecret}`).toString(
      'base64',
    );

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenEpiry = Date.now() + response.data.expires_in * 1000;
  }
}
