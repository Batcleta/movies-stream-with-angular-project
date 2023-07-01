import { Injectable } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly dbUrl = 'http://localhost:3004/movies';

  constructor(private http: HttpClient) { }

  async getMoviesList(): Promise<movieObject[]> {
    try {
      const movies = await this.http.get<movieObject[]>(this.dbUrl).toPromise();

      if (movies === undefined) return []
      return movies;

    } catch (error) {
      throw error;
    }
  }

  async updateMovie(movie: movieObject): Promise<string> {
    try {
      const url = `${this.dbUrl}/${movie.id}`
      await this.http.put<movieObject>(url, movie).toPromise();

      return "Filme atualizado com sucesso";
    } catch (error) {
      throw error;
    }
  }

  async addNewMovie(movie: movieObject): Promise<movieObject | undefined> {
    try {
      const newMovie = await this.http.post<movieObject>(this.dbUrl, movie).toPromise();
      return newMovie;

    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(movie: movieObject): Promise<movieObject | undefined> {
    try {
      const url = `${this.dbUrl}/${movie.id}`

      return await this.http.delete<movieObject>(url).toPromise();;
    } catch (error) {
      throw error;
    }
  }
}
