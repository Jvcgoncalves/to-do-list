import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';

import { UsersService } from '../../../services/users.service';
import { LoaderComponent } from '../../common/loader/loader.component';
import { ConfirmProfileEditsComponent } from './confirm-profile-edits/confirm-profile-edits.component';
import { Users } from '../../../interfaces/users';
import checkIfIsPasswordInput from '../../../../scripts/profile_extra_scripts/checkIfIsPasswordInput';
import checkIfNeedToFocusOnInput from '../../../../scripts/profile_extra_scripts/checkIfNeedToFocusOnInput';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ReactiveFormsModule, ConfirmProfileEditsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  getResponseError: boolean = false;
  getResponseErrorOnEdit: boolean = false;
  userData!: Users;
  userPasswordToConfirmChangesOrDeleteAccount!: string;
  hasDataUpdated = {
    name: false,
    email: false,
    password: false,
  };
  formGroupController!: FormGroup;
  showPasswordConfirmationComponentToEdit: boolean = false;
  showPasswordConfirmationComponentToDeleteAccount: boolean = false;

  @ViewChild("userNameInput") userNameInput!: ElementRef;
  @ViewChild("userEmailInput") userEmailInput!: ElementRef;
  @ViewChild("userPasswordInput") userPasswordInput!: ElementRef;

  constructor(private _userService: UsersService, private activatedRoute: ActivatedRoute, private location: Location, private _route: Router ) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.parent?.snapshot.params['userId']
    this._userService.getUserData({userId}).then(res =>{
      if(typeof res === 'string'){
        this.getResponseError = true;
        return;
      }
      this.userData = res;
      this.formGroupController = new FormGroup({
        userNameInput: new FormControl(this.userData.user_name,[this.validateUserName()]),
        userEmailInput: new FormControl(this.userData.email, [this.validateUserEmail()]),
        userPasswordInput: new FormControl(this.userData.password),
      })
    })
  }

  enableEditInput(event: Event){
    const htmlElementTarget = event.target as HTMLElement;

    if (htmlElementTarget.parentElement?.dataset?.['inputTarget']) {

      const inputTargetToManipulate = this.selectInputTargetToEdit(htmlElementTarget.parentElement);
      inputTargetToManipulate.nativeElement.toggleAttribute('readonly');

      checkIfNeedToFocusOnInput(inputTargetToManipulate);
      checkIfIsPasswordInput(inputTargetToManipulate);

    } else if (htmlElementTarget.dataset?.['inputTarget']) {

      const inputTargetToManipulate = this.selectInputTargetToEdit(htmlElementTarget);
      inputTargetToManipulate.nativeElement.toggleAttribute('readonly');

      checkIfNeedToFocusOnInput(inputTargetToManipulate);
      checkIfIsPasswordInput(inputTargetToManipulate);
    } 
  }

  selectInputTargetToEdit(htmlElementTarget: HTMLElement): ElementRef{
    const inputTargetName: keyof ProfilePageComponent = htmlElementTarget?.dataset['inputTarget'] as keyof ProfilePageComponent;
    
    const inputTargetSelected = this[inputTargetName] as unknown as ElementRef;
    return inputTargetSelected;
  }

  backPage(){
    this.location.back();
  }

  onInputValueChanged(inputTarget: Event){
    const inputAsHtmlElement = inputTarget.target as HTMLInputElement;
    this.verifyInputValueAndCompare(inputAsHtmlElement.id);   
  }

  verifyInputValueAndCompare(inputId: string){
    switch(inputId){
      case "user-name-input":
        if(this.formGroupController.value.userNameInput.trim() !== this.userData.user_name){
          this.hasDataUpdated.name = true;
        } else {
          this.hasDataUpdated.name = false;
        }
      break;
      case "user-email-input":
        if(this.formGroupController.value.userEmailInput.trim() !== this.userData.email){
          this.hasDataUpdated.email = true;
        } else {
          this.hasDataUpdated.email = false;
        }
      break;
      case "user-password-input":
        if(this.formGroupController.value.userPasswordInput.trim() !== this.userData.password){
          this.hasDataUpdated.password = true;
        } else {
          this.hasDataUpdated.password = false;
        }
      break;
      default: 
        alert("Não encontrado, reinicie a página para continuar as suas ações");
    }
  }

  submitForm(){
    this._userService.putUserData({ userId: this.userData._id, newUserData: this.formGroupController.value, password: this.userPasswordToConfirmChangesOrDeleteAccount }).then( async res =>{
      if(res === "user not allowed"){
        alert("Senha incorreta! tente novamente");
        return;
      }
      
      if(res === "user data updated"){
        alert("Dados alterados com sucesso!");
        return;
      }
    }).catch( e => {
      this.getResponseErrorOnEdit = true;
    }) 
  }

  deleteAccount(){
    this._userService.deleteUserData({userId: this.userData._id, password: this.userPasswordToConfirmChangesOrDeleteAccount}).then(res => {
      if(res === "wrong password"){
        alert("Senha incorreta!, tente novamente")
      } 

      if(res === "user deleted"){
        localStorage.setItem("userLogged","false");
        localStorage.setItem("userLoggedId",``);
        this._route.navigate([""]);
        return;
      }
    }).catch( e => {
      console.log(e);
    })
  }

  discartChanges(){
    this.userNameInput.nativeElement.value = this.userData.user_name
    this.userEmailInput.nativeElement.value = this.userData.email
    this.userPasswordInput.nativeElement.value = this.userData.password
    this.hasDataUpdated = {
      name: false,
      email: false,
      password: false,
    };
  }

  onConfirmPasswordToChangeAccountInfo(event: any){
    if(event.cancelOperation){
      this.cancelOperation();
      return;
    }

    this.showPasswordConfirmationComponentToEdit = false;
    this.userPasswordToConfirmChangesOrDeleteAccount = event.passwordValue;
    this.submitForm();
  }

  onConfirmPasswordToDeleteAccount(event: any){
    if(event.cancelOperation){
      this.cancelOperation();
      return;
    }
    
    this.userPasswordToConfirmChangesOrDeleteAccount = event.passwordValue;
    this.showPasswordConfirmationComponentToDeleteAccount = false;
    this.deleteAccount()
  }

  cancelOperation(){
    this.showPasswordConfirmationComponentToDeleteAccount = false
    this.showPasswordConfirmationComponentToEdit = false
  }

  checkToShowPasswordConfirmationComponent(){
    const { name, email, password } = this.hasDataUpdated
    if(name || email || password){
      this.showPasswordConfirmationComponentToEdit = true;    
    }
  }

  validateUserName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const userName = control.value as string;
      if (userName.match(/[\d]/)) {
        return { invalidUserName: true };
      } else {
        return null;
      }
    };
  }

  validateUserEmail(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>{
      const emailValue = control.value as string;
      const charactersBeforeAt = emailValue.match(/[\D\d_]+(?=@)/gi); // -> "At" == @ <-
      const charactersAfterAt = emailValue.match(/(?<=@)(\D)+/gi);// -> "At" == @ <-
      
      if(!charactersBeforeAt?.[0] || !charactersAfterAt?.[0]) return { invalidEmail: true }
      if (charactersBeforeAt?.[0]?.length <= 2 || charactersAfterAt[0]?.length <= 2) {
        return { invalidEmail: true };
      } else {
        return null;
      }
    }
  } 

  controlUserNameInput(event: KeyboardEvent){
    if(!event.key.match(/[a-zA-Z\sáãâÁÃÂéêÉÊíÍóôõÓÕÔúüÚÜ]/)) {
      event.preventDefault() ;
    }
  }
}