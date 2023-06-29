import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css'],
})
export class RateModalComponent {
  @Output() rateSubmitted = new EventEmitter<any>();

  ratingForm = new FormGroup({
    watched: new FormControl(true),
    rating: new FormControl(''),
    comments: new FormControl(''),
  });

  submitRating() {
    const formData = this.ratingForm.value;
    this.rateSubmitted.emit(formData);
    // Reset the form or close the modal if needed
  }
}
