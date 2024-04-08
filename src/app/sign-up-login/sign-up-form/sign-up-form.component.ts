import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})

export class SignUpFormComponent {
  @Input() setLoginOrSignUp!: Function;
  usersController = inject(UsersService)
  formGroupController = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(3)]),
  })

  submitFormAndSignUp(){
    if(!this.formGroupController.valid){
      alert("Form inválido")
      return
    }
    this.usersController.sendFormAndSignUp({
      email: this.formGroupController.value.email ?? '',
      password: this.formGroupController.value.password ?? '',
      userName: this.formGroupController.value.userName ?? ''
    })
  }
}
