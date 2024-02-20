import { Component } from '@angular/core';
import { ReviewListComponent } from '../../components/review-list/review-list.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {ionAddOutline} from "@ng-icons/ionicons";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewListComponent,RouterLink,NgIconComponent,FormsModule],
  providers:[provideIcons({ionAddOutline})],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  selectedCategory:number = 0;

  counter:number = 0;

  onCategoryChange(categoryId: number): void {
    this.selectedCategory = categoryId;
  }
  
  constructor (){}

}
