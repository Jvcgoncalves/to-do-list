import { Component, OnInit } from '@angular/core';
import { UserTasksService } from '../../../services/user-tasks.service';
import { ActivatedRoute } from '@angular/router';
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
  task!: UserTasks | string;
  getError: boolean = false
  constructor(private userTasksService: UserTasksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.params['taskId']
    const userId = this.activatedRoute.parent?.snapshot.params['userId']

    this.userTasksService.getSingleTask({taskId,userId}).then(res =>{
      console.log(res);
      this.task = res
    }).catch(e =>{
      this.getError = true
      
    })
  }
}
