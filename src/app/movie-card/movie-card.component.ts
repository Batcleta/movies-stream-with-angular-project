import { Component, Input, Output, EventEmitter } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() movies: movieObject[] = [];
  @Output() excludeMovie = new EventEmitter<movieObject>();

  markToExclude(movie: movieObject) {
    this.excludeMovie.emit(movie);
  }
}
