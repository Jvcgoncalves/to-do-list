import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-profile-edits',
  standalone: true,
  imports: [],
  templateUrl: './confirm-profile-edits.component.html',
  styleUrl: './confirm-profile-edits.component.scss'
})
export class ConfirmProfileEditsComponent {

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @Output() confirmPassword = new EventEmitter();
  @Output() cancelOperation = new EventEmitter();


  confirmPasswordFuncion(event: SubmitEvent){
    event.preventDefault()
    this.confirmPassword.emit({
      passwordValue: this.passwordInput.nativeElement.value
    })
  }

  cancelOperationFunction(){
    this.confirmPassword.emit({
      cancelOperation: true
    })
  }

  cancelOperationByKeyboard(event: KeyboardEvent){
    if(event.key === "Enter"){
      this.cancelOperationFunction();
    }
  }
}
