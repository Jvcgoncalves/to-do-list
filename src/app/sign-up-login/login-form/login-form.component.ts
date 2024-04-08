import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {
  @Input() setLoginOrSignUp!: Function;
  userData!: Users | string;
  formGroupController = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  // public router: Router
  constructor(private router: Router, private userService: UsersService) { }

  submitFormAndlogin(){
    if(!this.formGroupController.valid){
      alert("Form inválido")
      return
    }

    this.userService.sendFormAndLogin({ 
      email: this.formGroupController.value.email ?? '', 
      password: this.formGroupController.value.password ?? '' 
    }).then(res =>{
      console.log(res);
      this.userData = res
      console.log(this.userData);
      if(typeof this.userData !== "string"){
        this.router.navigate(["home",`${this.userData._id}`])
      }

    }).catch(e=>{
      console.log(e);
    })
  }

}
