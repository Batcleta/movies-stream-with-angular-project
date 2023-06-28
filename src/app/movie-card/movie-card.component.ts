import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { movieObject } from 'src/@types/movie-object-type';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  constructor(private productService: MovieService) {}

  movies: movieObject[] = this.productService.getMoviesList();
}
