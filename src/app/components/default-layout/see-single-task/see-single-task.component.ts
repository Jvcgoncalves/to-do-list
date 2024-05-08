import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import { UserTasks } from '../../../interfaces/user-tasks';
import { UserTasksService } from '../../../services/user-tasks.service';
import checkTaskTime from '../../../../scripts/checkTaskTime';
import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-see-single-task',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './see-single-task.component.html',
  styleUrl: './see-single-task.component.scss'
})

export class SeeSingleTaskComponent implements OnInit {
  task!: UserTasks;
  getResponseOnGetError: boolean = false;
  taskNotFound: boolean = false;
  inputControll!: boolean;
  getErrorOnDelete: boolean = false;
  overdueOrOnTimeTaskStatus!: string;
  overdueOrOnTimeTaskClassToAdd!: string;
  pathToEditTask!: string;
  @ViewChild("doneStatus") doneStatusInput!: ElementRef;

  constructor(private userTasksService: UserTasksService, private activatedRoute: ActivatedRoute, private routes: Router, private location: Location) { }

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.params['taskId'];
    const userId = this.activatedRoute.parent?.snapshot.params['userId'];

    this.userTasksService.getSingleTask({taskId,userId}).then(res =>{
      
      if(typeof res === 'string'){
        this.taskNotFound = true;
        return;
      }
      
      this.task = res;
      this.inputControll = this.task.done;
      this.checkTaskTime();
      this.setPathToEditTask();
    }).catch(e =>{
      console.log(e);
      
      this.getResponseOnGetError = true;
    })
  }

  setTaskStatus(){
    if(this.doneStatusInput.nativeElement.className.includes("changing-done-status")) return
    this.inputControll = !this.inputControll;
    this.editTask();
  }

  onEnterKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.setTaskStatus();
    }
  }

  editTask(){
    this.doneStatusInput.nativeElement?.classList.add("changing-done-status");

    this.userTasksService.editTask({ 
      userId: this.task.userId, 
      taskId: this.task._id, 
      newTaskData: {done: this.inputControll} 
    })
    .then(res => {
      if(res === "task edited"){
        setTimeout(() => { 
           this.doneStatusInput.nativeElement?.classList.remove("changing-done-status");
        }, 1000)
      }
      this.checkTaskTime()
    })
  }

  backPage(){
    this.location.back();
  }

  deleteCurrentTask(){
    if(!confirm(`Tem certeza que deseja excluir a tarefa ${this.task.name}?`)) return
    const taskId = this.activatedRoute.snapshot.params['taskId'];
    const userId = this.activatedRoute.parent?.snapshot.params['userId'];

    this.userTasksService.deleteTask({userId,taskId}).then(res => {
      if(res === "invalid id" || res === "task not found"){
        this.getErrorOnDelete = true;
        setTimeout(()=>{
          this.getErrorOnDelete = false;
        },5000);
        return;
      }
      this.location.back();
    }).catch(e => {
      this.getResponseOnGetError = true;
    })
  }

  checkTaskTime(){
    if(this.inputControll){
      this.overdueOrOnTimeTaskClassToAdd = "delivered";
      this.overdueOrOnTimeTaskStatus = "Entregue"
      return
    }
    
    this.overdueOrOnTimeTaskStatus = checkTaskTime({register_date: this.task.register_date, delivery_date: this.task.delivery_date});
    if(this.overdueOrOnTimeTaskStatus === "Dentro do prazo"){
      this.overdueOrOnTimeTaskClassToAdd = "on-time";
    } else if(this.overdueOrOnTimeTaskStatus === "Em atraso") {
      this.overdueOrOnTimeTaskClassToAdd ="overdue";
    }
  }

  setPathToEditTask(){
    this.pathToEditTask = `/user-logged/${this.task.userId}/task/${this.task._id}/edit-task`;
  }
}
