import { Component,Input, SimpleChange } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../../db';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionGameControllerOutline, ionTvOutline,ionVideocamOutline, ionChevronForwardOutline } from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [NgIconComponent,RouterLink],
  providers:[provideIcons({
    ionGameControllerOutline,
    ionChevronForwardOutline,
    ionTvOutline,
    ionVideocamOutline
  })],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  constructor (private reviewService:ReviewsService){  }

  reviews: Review[] = [];
  @Input() selectedCategory: number =0; // Default to All

  ngOnInit():void{
    this.listReviews();
  }

  ngOnChanges(changes:SimpleChange){
    this.listReviews();
  }
  listReviews(): void {
    this.reviewService.getReviews().then((reviews) => {
      this.reviews = this.filterReviews(reviews);
      // Call filterReviews after reviews are loaded
      
    });
  }

  filterReviews(reviews:any[]): any[] {
    if (this.selectedCategory != 0) {
     return reviews.filter((review) => review.categoryId === this.selectedCategory);
    } else {
      return reviews;
    }
}}
