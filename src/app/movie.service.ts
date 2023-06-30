import { Injectable } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly dbUrl = 'http://localhost:3004/movies';

  constructor(private http: HttpClient) {}

  getMoviesList(): Observable<movieObject[]> {
    return this.http.get<movieObject[]>(this.dbUrl);
  }

  fetchMovies(): Promise<movieObject[]> {
    return new Promise((resolve, reject) => {
      this.getMoviesList().subscribe(
        (movies: movieObject[]) => {
          resolve(movies);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  updateMovie(movie: movieObject): Observable<movieObject> {
    const url = `${this.dbUrl}/${movie.id}`;
    return this.http.put<movieObject>(url, movie);
  }

  searchMoviesFromApi(movieName: string): Observable<movieObject[]> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    return this.http.get<movieObject[]>(url, {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkwZTdiN2ZlMjcxMmQ5OTY5NWM0NTczMWY2ZGI3MiIsInN1YiI6IjY0OWMyNDEyZmQ0ZjgwMDEwZDk4YWI0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyZGT1Z8mvq_BZ_Zu8zqmAehmQq4VPvuQxn5LLSacbU',
      },
    });
  }
}
