import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: [] = [];
  loading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
      private spotify: SpotifyService) {
    this.activatedRoute.params.subscribe( params => {
      this.getArtista(params['id']);
      this.getTopTrack(params['id']);
    });
  }

  getArtista(id: string){
    this.loading = true;
    this.spotify.getArtista(id)
        .subscribe(artista => {
          console.log(artista);
          this.artista = artista;
          this.loading = false;
      });
  }


  getTopTrack(id: string){
    this.spotify.getTopTracks(id)
        .subscribe(topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;
      });
  }
}
