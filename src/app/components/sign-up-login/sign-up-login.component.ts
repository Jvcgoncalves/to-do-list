import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-login',
  standalone: true,
  imports: [LoginFormComponent,SignUpFormComponent],
  templateUrl: './sign-up-login.component.html',
  styleUrl: './sign-up-login.component.scss'
})
export class SignUpLoginComponent {
  loginOrSignUp: String = "signUp"
  
  setLoginOrSignUp = (): void => {
    if(this.loginOrSignUp === "login"){ 
      this.loginOrSignUp = "signUp"
    } else if(this.loginOrSignUp === "signUp"){
      this.loginOrSignUp = "login"
    }
  }
}
