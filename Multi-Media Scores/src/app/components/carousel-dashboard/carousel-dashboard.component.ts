import { Component } from '@angular/core';
import { ReviewListComponent } from "../review-list/review-list.component";
import { Review } from '../../../db';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'app-carousel-dashboard',
    standalone: true,
    templateUrl: './carousel-dashboard.component.html',
    styleUrl: './carousel-dashboard.component.css',
    imports: [ReviewListComponent]
})
export class CarouselDashboardComponent {
reviews: any;

}
