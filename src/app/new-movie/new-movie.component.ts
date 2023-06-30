import { Component } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { ThemoviedbService } from '../themoviedb.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent {
  back = '<< Back';
  searchQuery: string = '';
  apiMovies: movieObject[] = [];
  dbMovies: movieObject[] = [];

  constructor(
    private themovieodbService: ThemoviedbService,
    private movieService: MovieService
  ) {}

  async searchMovies() {
    await this.fetchMovies();
    try {
      const response = await this.themovieodbService.searchMoviesFromApi(
        this.searchQuery
      );

      this.apiMovies = response.results.filter(
        (movie) =>
          movie.overview &&
          movie.poster_path &&
          !this.isMovieAlreadyAdded(movie.id)
      );
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  async selectMovie(movie: movieObject) {
    const response = await this.movieService.addNewMovie(movie).subscribe(
      (res) => {
        alert(`The movie ${res.original_title} was sussefully added`);
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );

    this.movieService.addNewMovie(movie).subscribe(
      (response) => {
        // Handle the successful response, if needed
        console.log('Movie added successfully:', response);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error adding movie:', error);
      }
    );
  }

  async fetchMovies() {
    try {
      this.dbMovies = await this.movieService.getMoviesList();
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  isMovieAlreadyAdded(movieId: number): boolean {
    return this.dbMovies.some((movie) => movie.id === movieId);
  }

  clearMoviesList() {}
}
