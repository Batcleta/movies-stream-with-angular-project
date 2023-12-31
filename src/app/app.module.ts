import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { RouterModule, Routes } from '@angular/router';
import { RateModalComponent } from './rate-modal/rate-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    NewMovieComponent,
    RateModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: MoviesListComponent },
      { path: 'movie-details/:movieId', component: MovieDetailsComponent },
      { path: 'new-movie', component: NewMovieComponent },
    ]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
