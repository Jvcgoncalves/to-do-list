import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-login',
  standalone: true,
  imports: [ LoginFormComponent, SignUpFormComponent ],
  templateUrl: './sign-up-login.component.html',
  styleUrl: './sign-up-login.component.scss'
})
export class SignUpLoginComponent {
  loginOrSignUp: string = "login"
  @ViewChild("recoverPasswordMessage") recoverPasswordMessage!: ElementRef;

  setLoginOrSignUp = (): void => {
    if(this.loginOrSignUp === "login"){ 
      this.loginOrSignUp = "signUp";
    } else if(this.loginOrSignUp === "signUp"){
      this.loginOrSignUp = "login";
    }
  }

  onGoToRecoverPasswordCalled(){
    this.toggleRecoverPasswordMessage();
  }

  toggleRecoverPasswordMessage(){
    this.recoverPasswordMessage.nativeElement.classList.add("actived");
    setTimeout(()=>{
      this.recoverPasswordMessage.nativeElement.classList.remove("actived");
    },3000);
  }
}
