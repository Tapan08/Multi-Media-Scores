import { Injectable } from '@angular/core';
import {db, Review} from "../../db"
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

  getReviews():Promise<Array<Review>>{
    return db.reviews.toArray();
  }

  addReview(review:Review):PromiseExtended{
    return db.reviews.add(review);
  }

  getReview(reviewId:number):PromiseExtended{
    return db.reviews.get(reviewId)
  }

  updateReview(reviewId:number,review:Review){
    return db.reviews.update(reviewId,review);
  }

  deleteReview(reviewId:number){
    db.reviews.delete(reviewId)
  }
}
