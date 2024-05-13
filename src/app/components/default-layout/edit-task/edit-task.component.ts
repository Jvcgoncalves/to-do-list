import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserTasks } from '../../../interfaces/user-tasks';
import { UserTasksService } from '../../../services/user-tasks.service';
import { NgxMaskDirective } from 'ngx-mask';
import formatDate from '../../../../scripts/formatDate';
import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, LoaderComponent ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  formController!: FormGroup;
  radioInputStatus!: boolean;
  taskData!: UserTasks;
  errorOnLoadTaskData: boolean = false
  getErrorOnEdit: boolean = false;
  getSameTaskData: boolean = false;
  dataNotChangedInteraton: number = 0;

  constructor(private userTaskService: UserTasksService, private activatedRoute: ActivatedRoute, private location: Location ) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.parent?.params['userId'];
    const taskId = this.activatedRoute.snapshot.params['taskId'];

    this.userTaskService.getSingleTask({taskId,userId}).then(res =>{
      if(typeof res === 'string'){
        this.errorOnLoadTaskData = true;
        return;
      }
      this.taskData = res;
      this.setFormController();
    })
  }

  setFormController(){
    this.formController = new FormGroup({
      name: new FormControl(this.taskData.name.trim(), [Validators.required,this.validateWhiteSpaces()]),
      delivery_date: new FormControl(formatDate({date: this.taskData.delivery_date}), [Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
      description: new FormControl(this.taskData.description.trim(), [Validators.required, Validators.minLength(1),this.validateWhiteSpaces()]),
      done: new FormControl(this.taskData.done)
    });  
    this.radioInputStatus = this.formController.value.done;
  }

  validateWhiteSpaces(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const haveOnlyWhiteSpace = control.value as string;
      if (haveOnlyWhiteSpace.trim().length === 0) {
        return { haveOnlyWhiteSpace: true };
      } else {
        return null;
      }
    };
  }

  handleSubmit(){
    const { name, description, delivery_date, done } = this.formController.value;

    if(name === this.taskData.name){
      this.dataNotChangedInteraton++;
    } 
    if(description === this.taskData.description){
      this.dataNotChangedInteraton++;
    } 
    if(delivery_date === this.taskData.delivery_date){
      this.dataNotChangedInteraton++;
    } 
    if(done === this.radioInputStatus){
      this.dataNotChangedInteraton++;
    }

    if(this.dataNotChangedInteraton === 4){
      this.getSameTaskData = true;
      setTimeout(() => { 
        this.getSameTaskData = false;
        this.dataNotChangedInteraton = 0;
      },3000);
      return;
    }

    this.formController.value.done = this.radioInputStatus;

    this.userTaskService.editTask({ 
      userId: this.taskData.userId,
      taskId: this.taskData._id,
      newTaskData: this.formController.value 
    }).then( res =>{
      if(res === "can't edit task" || res === "user/task id invalid"){
        this.getErrorOnEdit = true;
      } else if(res === "task edited") {
        alert("Tarefa editada com sucesso!")
        this.backPage()
      }
    }).catch( err =>{
      this.getErrorOnEdit = true
    })
  }

  backPage(){
    this.location.back();
  }

  setTaskStatus(){
    this.radioInputStatus = !this.radioInputStatus;
  }

  onEnterKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setTaskStatus();
    }
  }
}
