import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieObject } from 'src/@types/movie-object-type';
import { MovieService } from '../movie.service';
import { movieWatched } from 'src/@types/movie-watched-type';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  @Output() movieWatched = new EventEmitter<movieObject>();

  isModalOpen = false;
  back: string = '< Back';
  movies: movieObject[] = [];
  movie?: movieObject;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchMovies();
  }

  async fetchMovies() {
    try {
      this.movies = await this.movieService.getMoviesList();
      const movieIdFromRoute = Number(
        this.route.snapshot.paramMap.get('movieId')
      );
      this.movie = this.movies.find((movie) => movie.id === movieIdFromRoute);

      if (this.movie) {
        const date = new Date(this.movie?.release_date);
        this.movie.release_date = date.toLocaleDateString().toString();
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  onMovieWatched() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }

  async onModalSubmited(watchedParams: movieWatched) {
    this.onCloseModal();

    const movieIndex = this.movies.findIndex((m) => m.id === this.movie?.id);
    if (movieIndex !== -1) {
      this.movies[movieIndex].watched = watchedParams.watched;
      this.movies[movieIndex].rating = watchedParams.rating;
      this.movies[movieIndex].comment = watchedParams.comment;

      try {
        const updatedMovie = await this.movieService.updateMovie(this.movies[movieIndex]);
        console.log('Movie updated successfully:', updatedMovie);
      } catch (error) {
        console.error('Error updating movie:', error);
      }
    }
  }
}
