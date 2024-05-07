import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserTasksService } from '../../../../services/user-tasks.service';
import { UserTasks } from '../../../../interfaces/user-tasks';
import { LoaderComponent } from '../../../common/loader/loader.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() userId!: string | null;
  @Input() tasksToShow!: UserTasks[] | [];
  //'d-grid row-gap-4 column-gap-5' : 'd-flex'
  contentDivClasses: string = 'd-flex';
  userAllTasks!:  UserTasks[] | [];
  searchTasksFormController = new FormGroup({
    searchBar: new FormControl('')
  })

  responseReturnError: boolean | null = null;

  constructor(private taskService: UserTasksService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userLoggedId")
    this.taskService.getAllUserTasks({userId: this.userId}).then(res =>{
      if(Array.isArray(res)){
        this.userAllTasks = res
        this.tasksToShow = res
        this.responseReturnError = false
        this.contentDivClasses = this.userAllTasks?.length === 0 ? "d-flex" : "d-grid row-gap-4 column-gap-5"
        
      } else {
        this.responseReturnError = true
      }
    }).catch( e =>{
      this.responseReturnError = true
    })
  }

  searchByTyping(){    
    if(this.responseReturnError) return
    
    const nameTypedByUser = this.searchTasksFormController.value.searchBar
    this.tasksToShow = this.userAllTasks.filter(task => task.name.trim().toLowerCase().match(nameTypedByUser?.trim().toLowerCase() || ""))
  }
}
