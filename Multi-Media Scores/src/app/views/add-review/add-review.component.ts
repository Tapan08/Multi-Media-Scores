import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { Category } from '../../../db';
import { CategoriesService } from '../../services/categories.service';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoriesService,
    private reviewService:ReviewsService,
    private router: Router
    ) { }

  // Atributes
  title:string = "";
  year:string = "";
  categories:Category[] = [];
  action:string = "Add";
  reviewId:number = 0;

  // Form Control
  addReviewForm = new FormGroup({
    title: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z ]*/)
    ]),
    comment: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z ]*/)
    ]),
    year: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^(?:19|20)\d{2}$/)
    ]),
    rating: new FormControl(0, [
      Validators.required, 
      Validators.pattern(/^[1-5]$/)
    ]),
    category: new FormControl('',[
      Validators.required, 
      Validators.pattern(/^[1-3]$/)
    ])
  });

  // Methods
  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params["reviewId"] !== undefined){
          this.reviewService.getReview(parseInt(params["reviewId"])).then((review) =>{
            // SEt the view as Edit
            this.action = "Edit";
            this.reviewId = review.id;

            // Set the Values in the form
            this.addReviewForm.controls.title.setValue(review.title);
            this.addReviewForm.controls.year.setValue(review.year);
            this.addReviewForm.controls.rating.setValue(review.rating);
            this.addReviewForm.controls.category.setValue(review.categoryId);
            this.addReviewForm.controls.comment.setValue(review.comment);
          })
        }
        else{
          this.title=params['title'];
          this.year = params['year'];
        }
      }
    );

    this.listCategories();
    }

  listCategories():void{
      this.categoryService.getCategories().then((categories) =>{
        this.categories = categories;
      });
    }

  onSubmit() {
      if (this.addReviewForm.valid) {
        

        let newReview = {
          title:this.addReviewForm.value.title ?? "",
          year:this.addReviewForm.value.year ?? "",
          comment:this.addReviewForm.value.comment ?? "",
          rating:this.addReviewForm.value.rating ?? 1,
          categoryId:parseInt(this.addReviewForm.value.category ?? "1")
        }
        if (this.reviewId !== 0){
          this.reviewService.updateReview(this.reviewId,newReview)
        }
        else{
          this.reviewService.addReview(newReview)
        }
        
        this.router.navigate(["/reviews"]);
      } else {
        // Mark all fields as touched to display error messages
        this.addReviewForm.markAllAsTouched();
      }
    }

    deleteReview(){
      this.reviewService.deleteReview(this.reviewId);
      this.router.navigate(["/reviews"]);
    }
}
