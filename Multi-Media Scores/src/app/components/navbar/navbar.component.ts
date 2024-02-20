import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {ionHomeOutline,ionListOutline,ionCheckboxOutline,ionInformationCircleOutline} from "@ng-icons/ionicons";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  providers:[
    provideIcons({
      ionHomeOutline,
      ionListOutline,
      ionCheckboxOutline,
      ionInformationCircleOutline
    })
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
}
