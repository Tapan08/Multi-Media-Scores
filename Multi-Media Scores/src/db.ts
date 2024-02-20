import Dexie, { Table } from 'dexie';

export interface Category {
    id?: number;
    name:string;
}

export interface Review {
    id?: number;
    title: string;
    year: string;
    categoryId?:number;
    rating:number;
    comment:string;
}

export interface ToDo {
  id?: number;
  title: string;
  categoryId?:number;
}

export class AppDB extends Dexie {
    categories!: Table<Category, number>;
    reviews!: Table<Review, number>;
    toDos!: Table<ToDo, number>;

    constructor() {
        super('multimediaScores');
        this.version(1).stores({
            categories: '++id',
            reviews: '++id, categoryId',
            toDos: 'id++,categoryId'
        });
        this.on('populate', () => this.populate());
      }

      async populate() {
        await db.categories.bulkAdd([
          {
            name: 'Movie',
          },
          {
            name: 'TV Show',
          },
          {
            name: 'Videogame',
          },
        ]);
         
    }
}  
export const db = new AppDB();
