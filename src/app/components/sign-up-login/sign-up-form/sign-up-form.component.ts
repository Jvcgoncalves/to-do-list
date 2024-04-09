import { Component, Input, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
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
  signUpResponse!: string | null;
  titleMessage: string = "Registrar-se";

  formGroupController = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, this.validateUserEmail()]),
    userName: new FormControl('',[Validators.required,this.validateUserName()]),
    password: new FormControl('',[Validators.required, Validators.minLength(3)]),
  })

  constructor() { }

  restartSignUp(){
    this.signUpResponse = this.signUpResponse !== null ? null : this.signUpResponse
    this.titleMessage = this.titleMessage !== "Registrar-se" ? "Registrar-se" : this.titleMessage
  }

  submitFormAndSignUp(){
    if(!this.formGroupController.valid) return
    
    this.usersController.sendFormAndSignUp({
      email: this.formGroupController.value.email ?? '',
      password: this.formGroupController.value.password ?? '',
      userName: this.formGroupController.value.userName ?? ''
    }).then(res => {
      this.signUpResponse = res
      if(this.signUpResponse === "email already registered") return alert("Este email já está sendo usado")
      this.titleMessage = "Registrado!"
    }).catch(e => {
      console.log(e);
    })
  }

  controlInput(event: KeyboardEvent){
    if(!event.key.match(/[a-zA-Z\sáãâÁÃÂéêÉÊíÍóôõÓÕÔúüÚÜ]/)) {
      event.preventDefault() 
    }
  }

  validateUserEmail(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>{
      const emailValue = control.value as string
      const charactersBeforeAt = emailValue.match(/[\D\d_]+(?=@)/gi) // -> @ <-
      const charactersAfterAt = emailValue.match(/(?<=@)(\D)+/gi) // -> @ <-
      
      if(!charactersBeforeAt?.[0] || !charactersAfterAt?.[0]) return { invalidEmail: true }
      if (charactersBeforeAt?.[0]?.length <= 2 || charactersAfterAt[0]?.length <= 2) {
        return { invalidEmail: true }
      } else {
        return null
      }
    }
  } 

  validateUserName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const userName = control.value as string;
      if (userName.match(/[\d]/)) {
        return { invalidUserName: true }; // Retorna um objeto com a chave da validação e o valor true
      } else {
        return null; // Retorna null se a validação passar
      }
    };
  }
}
