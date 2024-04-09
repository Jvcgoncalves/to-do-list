import { Component, OnInit, inject } from '@angular/core';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AsideNavBarComponent } from '../aside-nav-bar/aside-nav-bar.component';
import { Users } from '../../interfaces/users';
import { UserTasks } from '../../interfaces/user-tasks';
import { UsersService } from '../../services/users.service';
import { TaskComponent } from './home-page/task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DefaultHeaderComponent,AsideNavBarComponent,TaskComponent,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultlayoutComponent implements OnInit {
  userData!: Users;
  userTasks!: UserTasks[];
  router: ActivatedRoute = inject(ActivatedRoute);

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const userId = this.router.snapshot.params['userId']
    
    this.userService.getUserData({userId}).then(res =>{
      this.userData = res

    }).catch(e => {
      console.log(e);
    })
    console.log(userId);

  }
}
