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

  getMoviesList(): Promise<movieObject[]> {
    const movies = this.http.get<movieObject[]>(this.dbUrl);

    return new Promise((resolve, reject) => {
      movies.subscribe(
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
}
