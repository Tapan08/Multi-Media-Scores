import { Component, Input } from '@angular/core';
import { ExternalService } from '../../services/external.service';

@Component({
  selector: 'app-movies-carousel',
  standalone: true,
  imports: [],
  templateUrl: './movies-carousel.component.html',
  styleUrl: './movies-carousel.component.css'
})
export class MoviesCarouselComponent {

  constructor(private externalService:ExternalService){}

  @Input() type:string = "Movies";

  reccomendations = [];
  isLoading:boolean = true;
  identifier = `carouselExample${this.type}`

  ngOnInit(){
    if (this.type == "Movies"){ 
      this.externalService.getAllMovies().then((reccomendations) =>{
        this.reccomendations = reccomendations;
        this.isLoading = false;
        
      });
    }
    else if (this.type == "Games"){
      this.externalService.getAllGames().then((reccomendations) =>{
        this.reccomendations = reccomendations;
        this.isLoading = false;
      });
    }
    else{
      this.externalService.getAllTVShows().then((reccomendations) =>{
        this.reccomendations = reccomendations;
        this.isLoading = false;
      });
    }
    this.identifier = `carouselExample${this.type.split(" ").join("")}`
    
  }

  checkActive(index:number){
    return index == 0  ? "active" : ""; 
  }
}
