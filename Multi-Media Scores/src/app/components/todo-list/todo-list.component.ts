import { Component,Input } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ToDo } from '../../../db';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionGameControllerOutline, ionTvOutline,ionVideocamOutline, ionChevronForwardOutline } from '@ng-icons/ionicons';
import { RouterLink, ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  providers:[provideIcons({
    ionGameControllerOutline,
    ionChevronForwardOutline,
    ionTvOutline,
    ionVideocamOutline
  })],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  constructor (
    private todoService:TodosService,
    private router:Router
    ){}

  todos: ToDo[] = [];
  @Input() selectedCategory: number = 0; // Default to All

  ngOnInit():void{
    console.log(this.selectedCategory)
    this.listToDos();
  }

  ngOnChanges(): void {
    console.log(this.selectedCategory)
    this.listToDos();
  }

  listToDos(): void {
    this.todoService.getTodos().then((todos) => {
      this.todos = todos;
      this.filterReviews();
    });
  }

  filterReviews(): any[] {
    if (this.selectedCategory != 0) {
     return this.todos.filter((todos) => todos.categoryId === this.selectedCategory);
    } else {
      return this.todos;
    }
  }

  onCategoryChange(categoryId: number): void {
    this.selectedCategory = categoryId;
    console.log(this.selectedCategory)
  }

  removeToDo(todoId:number){
    this.todoService.deleteTodo(todoId);
    this.listToDos();
  }
}
