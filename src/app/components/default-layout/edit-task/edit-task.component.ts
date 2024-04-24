import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserTasks } from '../../../interfaces/user-tasks';
import { UserTasksService } from '../../../services/user-tasks.service';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  formController!: FormGroup;
  taskData!: UserTasks;
  getErrorOnEdit: boolean = false;
  getSameTaskData: boolean = false;
  dataNotChangedInteraton: number = 0;

  constructor(private userTaskService: UserTasksService, private activatedRoute: ActivatedRoute, private location: Location ) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.parent?.params['userId'];
    const taskId = this.activatedRoute.snapshot.params['taskId'];

    this.userTaskService.getSingleTask({taskId,userId}).then(res =>{
      if(typeof res === 'string'){
        console.log(res);
        return;
      }
      this.taskData = res;
      this.setFormController();
    })
  }

  setFormController(){
    this.formController = new FormGroup({
      name: new FormControl(this.taskData.name),
      delivery_date: new FormControl(this.taskData.delivery_date),
      description: new FormControl(this.taskData.description),
      done: new FormControl(this.taskData.done)
    });
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
    if(done === this.taskData.done){
      this.dataNotChangedInteraton++;
    }
    console.log(this.dataNotChangedInteraton);

    if(this.dataNotChangedInteraton === 4){
      this.getSameTaskData = true;
      setTimeout(() => { 
        this.getSameTaskData = false;
        this.dataNotChangedInteraton = 0;
      },3000);
      return;
    }

    this.userTaskService.editTask({ 
      userId: this.taskData.userId,
      taskId: this.taskData._id,
      newTaskData: this.formController.value 
    }).then( res =>{
      if(res === "can't edit task" || res === "user/task id invalid"){
        this.getErrorOnEdit = true;
      } else {
        this.backPage()
      }
    }).catch( err =>{
      console.log(err);
    })
  }

  backPage(){
    this.location.back();
  }

  setTaskStatus(){
    this.formController.value.done = !this.formController.value.done;
  }
}
