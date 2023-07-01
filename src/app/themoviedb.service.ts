import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { themoviedbResponse } from 'src/@types/themoviedb-response-type';

@Injectable({
  providedIn: 'root',
})
export class ThemoviedbService {
  constructor(private http: HttpClient) { }

  async searchMoviesFromApi(movieName: string): Promise<themoviedbResponse | undefined> {

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
      const movies = this.http.get<themoviedbResponse>(url, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkwZTdiN2ZlMjcxMmQ5OTY5NWM0NTczMWY2ZGI3MiIsInN1YiI6IjY0OWMyNDEyZmQ0ZjgwMDEwZDk4YWI0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyZGT1Z8mvq_BZ_Zu8zqmAehmQq4VPvuQxn5LLSacbU',
        },
      }).toPromise();
      return movies;

    } catch (error) {
      throw error;
    }
  }
}
