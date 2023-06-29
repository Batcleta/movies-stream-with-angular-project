import { Component, Input } from '@angular/core';
import { movieObject } from 'src/@types/movie-object-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movies: movieObject[] = [];

  constructor(private request: HttpClient) {}
}
