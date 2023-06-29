import { Component, Input, Output, EventEmitter } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movies: movieObject[] = [];
  @Output() movieWatched = new EventEmitter<movieObject>();
  @Output() excluseMovie = new EventEmitter<movieObject>();

  constructor(private request: HttpClient) {}

  markMovieAsWatched(movie: movieObject) {
    this.movieWatched.emit(movie);
  }

  markToExclude(movie: movieObject) {
    this.excluseMovie.emit(movie);
  }
}
