import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor() { }
  private baseUrl = 'https://multimedia-scores-api.lpino.dev/';


  // Main fetch function for recycle code
  private async fetchData(url: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  getAllMovies() {
    return this.fetchData('movies/all');
  }

  getAllGames() {
    return this.fetchData('games/all');
  }

  getAllTVShows() {
    return this.fetchData('tv/all');
  }
}
