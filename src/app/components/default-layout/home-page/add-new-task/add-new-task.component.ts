import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgxMaskDirective } from 'ngx-mask';
import { UserTasksService } from '../../../../services/user-tasks.service';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss'
})
export class AddNewTaskComponent {
  formController = new FormGroup({
    name: new FormControl('',[Validators.required,this.validateWhiteSpaces()]),
    description: new FormControl('',[Validators.required,this.validateWhiteSpaces()]),
    delivery_date: new FormControl('',[Validators.required, Validators.minLength(10)], ),
  });
  resetForm: boolean = false;
  responseOk: boolean | null = null;
  @ViewChild("resetFormInput") resetFormInput!: ElementRef;

  constructor(private userTasksService: UserTasksService, private activatedRouter: ActivatedRoute) { }

  handleSubmit(){
    const userId = this.activatedRouter.parent?.snapshot.params['userId']
    if(!this.formController.valid) return alert("Invalido")
      
      this.userTasksService.postNewUserTasks({
        name: this.formController.value.name ?? '',
        description: this.formController.value.description ?? '',
        delivery_date: this.formController.value.delivery_date ?? '',
        userId: userId ?? ''
      }).then(() => {
        this.responseOk = true
        setTimeout(()=>{
          this.responseOk = null
        }, 5000)
        this.resetForm = (this.resetFormInput.nativeElement as HTMLInputElement).checked
      }).catch(e => {
        this.responseOk = false
      }).finally(() => {
        if(this.resetForm) this.formController.reset()
      })
  }

  validateWhiteSpaces(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const haveOnlyWhiteSpace = control.value as string;
      if(!haveOnlyWhiteSpace){
        return null
      }
      if (haveOnlyWhiteSpace.trim().length === 0) {
        return { haveOnlyWhiteSpace: true };
      } else {
        return null;
      }
    };
  }

  setResetForm(){
    if((this.resetFormInput.nativeElement as HTMLInputElement).checked !== this.resetForm){
      this.resetForm = (this.resetFormInput.nativeElement as HTMLInputElement).checked
    }
    this.resetForm = !this.resetForm;
    (this.resetFormInput.nativeElement as HTMLInputElement).checked = this.resetForm;
  }

  onEnterKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setResetForm();
    }
  }
}
