import { Component, Input, OnInit } from '@angular/core';
import { UserTasksService } from '../../../../services/user-tasks.service';
import { UserTasks } from '../../../../interfaces/user-tasks';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <div class="main-content">
    <form [formGroup]="searchTasksFormController" class="search-form mb-3">
      <div class="input-block">
        <input type="text" id="search-tasks-input" class="form-control"
        formControlName="searchBar"
        placeholder=" "
        autocomplete="off"
        (input)="searchByTyping()"
        >
        <label for="search-tasks-input" class="floating-label">
          Pesquise uma tarefa pelo nome:
        </label>
        <img src="../../../../../assets/search-icon.svg" alt="" class="search-icon">
      </div>
    </form>
    <div class="content {{contentDivClasses}}">
      <p *ngIf="userAllTasks?.length === 0" class="text-center w-100 no-task-add-message">
        Nenhuma task adicionada ainda :(
      </p>
      <p *ngIf="userAllTasks?.length! >= 1 && tasksToShow?.length === 0" class="text-center w-100 no-task-found-message">
          Nenhuma task foi encontrada nessa busca
      </p>
      <article class="task-block p-2 rounded-3 d-flex flex-column" *ngFor="let task of tasksToShow">
        <div class="title-box mb-2 d-flex justify-content-between align-items-center">
          <h3 class="task-title m-0">{{task.name}}</h3>
          <img *ngIf="task.done; else elseDoneIcon" src="../../../../../assets/status_checkbox-right.svg" alt="status-box">
          <ng-template #elseDoneIcon>
            <img src="../../../../../assets/status_checkbox-x.svg" alt="status-box">
          </ng-template>
        </div>
        <div class="description m-0 mt-2">
          <h4 class="task-description-title mb-1">Descrição:</h4>
          <p class="task-description mb-1">{{task.description}}</p>
        </div>
        <div class="task-dates-block m-0 mt-2">
          <p class="tast-dates mb-1">Registro: {{task.register_date}}</p>
          <p class="tast-dates mb-1">Data de entrega: {{task.delivery_date}}</p>
        </div>
        <a routerLink="/user-logged/{{userId}}/task/{{task._id}}" class="btn btn-primary rounded-3 mt-4 see-more-button mx-auto">Detalhes

        </a>
      </article>
      <div class="error-block w-100 text-center" *ngIf="responseReturnError === true; else elseTasks_2">
        <p>Não foi possível carregar suas tasks :(</p>
      </div>
      <ng-template #elseTasks_2>
        <div  *ngIf="!userAllTasks" class="loader d-grid mx-auto">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </ng-template>
    </div>
  </div>
  `,
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
