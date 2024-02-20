import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ReviewsComponent } from './views/reviews/reviews.component';
import { ExploreComponent } from './views/explore/explore.component';
import { AddReviewComponent } from './views/add-review/add-review.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AboutusComponent } from './views/aboutus/aboutus.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:"reviews",
        component:ReviewsComponent
    },
    {
        path:"reviews/add",
        component:AddReviewComponent
    },
    {
        path:"explore",
        component:ExploreComponent
    },
    {
        path:"todo-list",
        component:TodoListComponent
    },
    {
        path:"profile",
        component:ProfileComponent
    },
    {
        path:"about-us",
        component:AboutusComponent
    },
    
];
