import { Component, OnInit } from '@angular/core';
import { UserTasksService } from '../../../services/user-tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTasks } from '../../../interfaces/user-tasks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-single-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './see-single-task.component.html',
  styleUrl: './see-single-task.component.scss'
})

export class SeeSingleTaskComponent implements OnInit {
  task!: UserTasks;
  getResponseOnGetError: boolean = false
  taskNotFound: boolean = false
  inputControll!: boolean
  getErrorOnDelete: boolean = false;

  constructor(private userTasksService: UserTasksService, private activatedRoute: ActivatedRoute, private routes: Router) { }

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.params['taskId']
    const userId = this.activatedRoute.parent?.snapshot.params['userId']

    this.userTasksService.getSingleTask({taskId,userId}).then(res =>{
      
      if(typeof res === 'string'){
        this.taskNotFound = true
        return 
      }
      
      this.task = res
      this.inputControll = this.task.done 
    }).catch(e =>{
      this.getResponseOnGetError = true
    })
  }

  setTaskStatus(){
    this.inputControll = !this.inputControll
    this.checkInputControlValue(this.inputControll)
  }

  checkInputControlValue(inputControllValue: boolean){

  }

  deleteCurrentTask(){
    const taskId = this.activatedRoute.snapshot.params['taskId']
    const userId = this.activatedRoute.parent?.snapshot.params['userId']

    this.userTasksService.deleteTask({userId,taskId}).then(res => {
      if(res === "invalid id" || res === "task not found"){
        this.getErrorOnDelete = true
        setTimeout(()=>{
          this.getErrorOnDelete = false
        },5000)
        return
      }
      console.log(res);
      
      this.routes.navigate(["user-logged",userId,"tasks"])
    }).catch(e => {
      console.log(e);
    })
  }

  checkTaskTime(){
    
  }
}
