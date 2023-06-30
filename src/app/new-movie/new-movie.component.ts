import { Component } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { ThemoviedbService } from '../themoviedb.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent {
  back = '<< Back';
  searchQuery: string = '';
  movies: movieObject[] = [];

  constructor(private movieService: ThemoviedbService) {}

  async searchMovies() {
    try {
      const response = await this.movieService.searchMoviesFromApi(
        this.searchQuery
      );

      this.movies = response.results.filter(
        (movie) => movie.overview && movie.poster_path
      );

      console.log(this.searchQuery);
      console.log(this.movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  selectMovie(movie: movieObject) {}

  clearMoviesList() {}
}
