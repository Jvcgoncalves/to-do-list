import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserTasksService } from '../../../services/user-tasks.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  userId!: string | null

  constructor(private taskService: UserTasksService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userLoggedId")
  }
}
