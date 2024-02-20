import { Component, Input } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { ToDo } from '../../../db';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { ionGameControllerOutline, ionTvOutline,ionVideocamOutline, ionChevronForwardOutline } from '@ng-icons/ionicons';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../db';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterLink,
    TodoListComponent,
    ReactiveFormsModule,
  ],
  providers:[provideIcons({
    ionGameControllerOutline,
    ionChevronForwardOutline,
    ionTvOutline,
    ionVideocamOutline
  })],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoriesService,
    private todoServices:TodosService,
    private router: Router
    ) { }

  // Atributes
  title:string = "";
  todoCategories:Category[] = [];
  action:string= "Add";
  toDoId:number = 0;

  addTodoForm = new FormGroup({
    title: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z ]*/)
    ]),
    category: new FormControl('',[
      Validators.required, 
      Validators.pattern(/^[1-3]$/)
    ])
  });

  ngOnInit() {
    this.listCategories();
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["toDoId"] !== undefined){
        this.todoServices.getTodo(parseInt(params["toDoId"])).then((toDo) =>{
          // SEt the view as Edit
          this.action = "Edit";
          this.toDoId = toDo.id;

          // Set the Values in the form
          this.addTodoForm.controls.title.setValue(toDo.title);
          this.addTodoForm.controls.category.setValue(toDo.categoryId);
        })
      }
      else{
        this.title=params['title'];
      }
      
    }
    );
  }

  listCategories():void{
    this.categoryService.getCategories().then((categories)=>{
      console.log(categories)
      this.todoCategories = categories;
    });
  }

  onSubmit(){
    if(this.addTodoForm.valid){

      let newTodo:ToDo = {
        title: this.addTodoForm.value.title??"",
        categoryId:parseInt(this.addTodoForm.value.category?? "1")
      }
      if(this.toDoId !== 0){
        this.todoServices.updateTodo(this.toDoId, newTodo)
      }else{
        this.todoServices.addTodo(newTodo);
      }

      this.router.navigate(["/todo-list"]);
    }else{
      this.addTodoForm.markAllAsTouched();
    }
  }
}
