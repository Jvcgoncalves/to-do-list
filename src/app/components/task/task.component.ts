import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  template: `
    <div class="content">
      <p>{{userId}}</p>
    </div>
  `,
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() userId!: string;
}
