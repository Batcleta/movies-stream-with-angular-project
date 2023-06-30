import { Injectable } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = 'http://localhost:3004/movies';

  constructor(private http: HttpClient) { }

  getMoviesList(): Observable<movieObject[]> {
    return this.http.get<movieObject[]>(this.apiUrl);
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
    const url = `${this.apiUrl}/${movie.id}`;
    return this.http.put<movieObject>(url, movie);
  }

}
