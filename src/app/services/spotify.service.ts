import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token = 'BQD1Mlz-asHcET7ZELSeIqgPva7-hZT3J26ccnazWRP1PQ0xj7mKDrpuutm2AJNqAdn6grp6yDG4If3uSGk';

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get(url, { headers });
  }

  constructor(private http: HttpClient) {
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
            .pipe( map(data => data['albums'].items ));
  }


  getArtistas(termino: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get('https://api.spotify.com/v1/search?q=' + termino + '&type=artist&limit=15', { headers });
  }


  getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
  }


  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe( map(data => data['tracks'] ));
  }
}
