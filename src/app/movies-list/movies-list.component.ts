import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { movieObject } from 'src/@types/movie-object-type';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {


  movies: movieObject[] = [];
  watchedMovie!: movieObject

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
      this.movies = await this.movieService.fetchMovies();
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  onMovieExcluded(movie: movieObject) {
    const movieIndex = this.movies.findIndex((m) => m.id === movie.id);
    if (movieIndex !== -1) {
      this.movies.splice(movieIndex, 1);
    }
  }




}
