import { Component, Input, OnInit } from '@angular/core';
import { UserTasksService } from '../../../../services/user-tasks.service';
import { UserTasks } from '../../../../interfaces/user-tasks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="content d-grid row-gap-4 column-gap-5">
    <article class="task-block p-2 rounded-3 d-flex flex-column" *ngFor="let task of userAllTasks">
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
      <button type="button" class="btn btn-primary rounded-3 mt-4 see-more-button mx-auto">Detalhes</button>
    </article>
    <div *ngIf="responseReturnError === true; else elseTasks_2">
      <p>Não foi possível carregar suas tasks :(</p>
    </div>
    <ng-template #elseTasks_2>
      <div  *ngIf="!userAllTasks" class="loader d-grid">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </ng-template>
  </div>
  `,
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  @Input() userId!: string | null;
  userAllTasks!:  UserTasks[] | [];
  responseReturnError: boolean = false;

  constructor(private taskService: UserTasksService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userLoggedId")
    this.taskService.getAllUserTasks({userId: this.userId}).then(res =>{
      if(Array.isArray(res)){
        this.userAllTasks = res
      } else {
        !this.responseReturnError 
      }
    }).catch( e =>{
      console.log(e);
    })
  }
}
