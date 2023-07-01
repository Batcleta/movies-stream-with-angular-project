import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { movieObject } from 'src/@types/movie-object-type';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent implements OnInit {
  movies: movieObject[] = [];
  watchedMovie!: movieObject;

  constructor(private movieService: MovieService) { }

  get nonWatchedMovies(): any[] {
    return this.movies.filter((movie) => !movie.watched);
  }

  get watchedMovies(): any[] {
    return this.movies.filter((movie) => movie.watched);
  }

  ngOnInit() {
    this.fetchMovies();
  }

  async fetchMovies() {
    try {
      this.movies = await this.movieService.getMoviesList();
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  async onMovieExcluded(movie: movieObject) {
    try {
      const updatedMovie = await this.movieService.deleteMovie(movie);
      console.log('Movie deleted successfully:', updatedMovie);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
}
