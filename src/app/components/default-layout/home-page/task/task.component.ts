import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  template: `
    <div class="content">
      <p>{{userId}}</p>
      <p>aaaa</p>
    </div>
  `,
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  @Input() userId!: string;

  ngOnInit(): void {
    console.log(this.userId);
      
  }
}
