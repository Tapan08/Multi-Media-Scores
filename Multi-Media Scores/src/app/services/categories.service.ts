import { Injectable } from '@angular/core';
import {Category, db} from "../../db"
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories():Promise<Array<Category>>{
    return db.categories.toArray();
  }
}
