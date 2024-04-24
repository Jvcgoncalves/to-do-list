import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UserTasksService } from '../../../../services/user-tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss'
})
export class AddNewTaskComponent {
  formController = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    delivery_date: new FormControl('',[Validators.required,Validators.minLength(10)]),
  });
  resetForm: boolean = false;
  responseOk: boolean | null = null;

  constructor(private userTasksService: UserTasksService, private activatedRouter: ActivatedRoute) { }

  handleSubmit(){
    const userId = this.activatedRouter.parent?.snapshot.params['userId']
    if(!this.formController.valid) return alert("Invalido")
      
      this.userTasksService.postNewUserTasks({
        name: this.formController.value.name ?? '',
        description: this.formController.value.description ?? '',
        delivery_date: this.formController.value.delivery_date ?? '',
        userId: userId ?? ''
      }).then(res => {
        this.responseOk = true
        setTimeout(()=>{
          this.responseOk = null
        }, 5000)
        if(this.resetForm) this.formController.reset()
      }).catch(e => {
        this.responseOk = false
      })

  }

  setResetForm(){
    this.resetForm = !this.resetForm
  }

  controlTypingData(ev: Event){
    ev.preventDefault()
    const inputElement = ev.target as HTMLInputElement;
    console.log(inputElement.value);
  }
}
