import { Component } from '@angular/core';
import { CarouselDashboardComponent } from '../../components/carousel-dashboard/carousel-dashboard.component';
import { ReviewListComponent } from "../../components/review-list/review-list.component";
import { MoviesCarouselComponent } from '../../components/movies-carousel/movies-carousel.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionGameControllerOutline, ionTvOutline,ionVideocamOutline} from '@ng-icons/ionicons';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CarouselDashboardComponent, ReviewListComponent,MoviesCarouselComponent,NgIconComponent],
    providers:[
        provideIcons({ionGameControllerOutline, ionTvOutline,ionVideocamOutline})
    ]
})
export class DashboardComponent {
    userName:string = "User";

    ngOnInit(){
        this.userName = localStorage.getItem("name") ?? "User";
    }
}
