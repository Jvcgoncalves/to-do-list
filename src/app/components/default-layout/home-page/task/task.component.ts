import { Component, Input, OnInit } from '@angular/core';
import { UserTasksService } from '../../../../services/user-tasks.service';
import { UserTasks } from '../../../../interfaces/user-tasks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="content d-grid gap-5">
    <article class="task-block p-2 rounded-3 d-flex flex-column gap-2" *ngFor="let task of userAllTasks">
      <h3 class="task-title">{{task.name}}</h3>
      <div class="description m-0">
        <h4 class="task-description-title mb-1">Descrição:</h4>
        <p class="task-description mb-1">{{task.description}}</p>
      </div>
      <div class="task-dates-block m-0">
        <p class="tast-dates mb-1">Registro: {{task.register_date}}</p>
        <p class="tast-dates mb-1">Data de entrega: {{task.delivery_date}}</p>
      </div>
      <button type="button" class="btn btn-primary see-more-button mx-auto">Detalhes</button>
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
        console.log(this.userAllTasks);
        console.log(res);
      } else {
        !this.responseReturnError 
      }
    }).catch( e =>{
      console.log(e);
    })
  }
}
