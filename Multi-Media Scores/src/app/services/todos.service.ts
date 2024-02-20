import { Injectable } from '@angular/core';
import { db, ToDo } from '../../db';
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  getTodos(): Promise<Array<ToDo>> {
    return db.toDos.toArray();
  }

  addTodo (todo: ToDo): PromiseExtended<number> {
    return db.toDos.add(todo);
  }

  getTodo(todoId:number):PromiseExtended{
    return db.toDos.get(todoId)
  }

  updateTodo(todoId:number,todo:ToDo){
    return db.toDos.update(todoId,todo);
  }

  deleteTodo (todoId: number) {
    db.toDos.delete(todoId);
  }
}
