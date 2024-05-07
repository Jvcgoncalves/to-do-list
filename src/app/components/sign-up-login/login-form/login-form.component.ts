import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent implements OnInit {
  @Input() setLoginOrSignUp!: Function;
  userData!: Users | string;
  formGroupController = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  serverError: boolean = false
  
  constructor(private router: Router, private userService: UsersService) { }

  submitFormAndlogin(){
    if(!this.formGroupController.valid){
      return
    }

    this.userService.sendFormAndLogin({ 
      email: this.formGroupController.value.email ?? '', 
      password: this.formGroupController.value.password ?? '' 
    }).then(res =>{
      this.userData = res

      if(typeof this.userData !== "string"){
        this.router.navigate(["user-logged",`${this.userData._id}`,"tasks"])
        localStorage.setItem("userLogged","true")
        localStorage.setItem("userLoggedId",`${this.userData._id}`)
      }

    }).catch(e=>{
      this.serverError = true
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem("userLogged") === "true"){
      const userId = localStorage.getItem("userLoggedId")
      this.router.navigate(["user-logged",`${userId}`])
    }
  }
}
