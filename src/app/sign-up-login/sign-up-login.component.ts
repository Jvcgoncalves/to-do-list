import { Component } from '@angular/core';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-login',
  standalone: true,
  imports: [SignUpLoginComponent,SignUpFormComponent],
  templateUrl: './sign-up-login.component.html',
  styleUrl: './sign-up-login.component.scss'
})
export class SignUpLoginComponent {

}
