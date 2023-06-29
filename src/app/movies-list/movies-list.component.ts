import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { movieObject } from 'src/@types/movie-object-type';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  movies: movieObject[] = this.movieService.getMoviesList();

  constructor(private movieService: MovieService) {}

  get nonWatchedMovies(): any[] {
    return this.movies.filter((movie) => !movie.watched);
  }

  get watchedMovies(): any[] {
    return this.movies.filter((movie) => movie.watched);
  }
}
