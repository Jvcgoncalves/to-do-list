import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ChangePasswordStatusResponseDirective } from '../../../shared/change-password-status-response.directive';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ChangePasswordStatusResponseDirective],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit {

  formController!: FormGroup;
  serverError: boolean = false
  successOnChangePassword: boolean | null = null;
  constructor(private _activatedRoute: ActivatedRoute, private _userService: UsersService) { }

  ngOnInit(): void {
    const userEmail = this._activatedRoute.snapshot.params?.['userEmail'];

    this.formController = new FormGroup({
      email: new FormControl(userEmail,),
      newPassword: new FormControl("",[Validators.required, Validators.minLength(3)])
    })
  }

  changePassword(){
    if(this.formController.valid){
      this._userService.changePassword({newPassword: this.formController.value?.newPassword , userEmail: this.formController.value.email}).then(res =>{
        if(res === "user not found") {
          this.successOnChangePassword = false;
        } else if(res === "user password updated"){
          this.successOnChangePassword = true;
        }
      }).catch(() =>{
        this.successOnChangePassword = false;
      })
    }
  }
}
