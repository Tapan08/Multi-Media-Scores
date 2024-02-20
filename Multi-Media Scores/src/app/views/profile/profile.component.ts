import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.pattern('[a-zA-Z ]*')
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ]),
  });

  userName =localStorage['name'] ?? "";
  userEmail=localStorage['email'] ?? "";
  
  ngOnInit():void{
    this.profileForm.controls.name.setValue(this.userName);
    this.profileForm.controls.email.setValue(this.userEmail); 
  }

  onSubmit() {
    if (this.profileForm.valid) {
      localStorage.setItem('name',this.profileForm.value.name ?? "")
      localStorage.setItem('email',this.profileForm.value.email ?? "")
      console.warn(this.profileForm.value);
    } else {
      // Mark all fields as touched to display error messages
      this.profileForm.markAllAsTouched();
    }
  }
}



