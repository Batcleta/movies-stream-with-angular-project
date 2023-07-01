import { Component, EventEmitter, Output } from '@angular/core';
import { movieWatched } from 'src/@types/movie-watched-type';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
})
export class RateModalComponent {
  @Output() rateSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<movieWatched> = new EventEmitter<movieWatched>();

  watchedStatus: boolean = true;
  rating: boolean | null = null;
  comment: string = '';

  submitRating() {
    const formData = {
      watched: this.watchedStatus,
      rating: this.rating === true ? "liked" : "disliked",
      comment: this.comment,
    };

    this.rateSubmitted.emit(formData);
  }

  close() {
    this.closeModal.emit()
  }
}