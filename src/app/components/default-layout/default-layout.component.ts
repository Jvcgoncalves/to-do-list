import { Component, OnInit, inject } from '@angular/core';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AsideNavBarComponent } from '../aside-nav-bar/aside-nav-bar.component';
import { Users } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { TaskComponent } from './home-page/task/task.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../common/loader/loader.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ DefaultHeaderComponent, AsideNavBarComponent, TaskComponent, RouterOutlet, RouterModule, CommonModule, LoaderComponent ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultlayoutComponent implements OnInit {
  userData!: Users;
  router: ActivatedRoute = inject(ActivatedRoute);
  responseReturnsError: boolean = false;

  constructor(private userService: UsersService, private workRoutes: Router) { }

  ngOnInit(): void {
    const userId = this.router.snapshot.params['userId']
    
    this.userService.getUserData({userId}).then(res =>{
      if(typeof res === "string") {
        this.responseReturnsError = true
        return
      }
      this.userData = res
    }).catch(e => {
      this.responseReturnsError = true
    })
  }

  signOut(){
    localStorage.setItem("userLogged","false")
    localStorage.setItem("userLoggedId",``)
    this.workRoutes.navigate([""])
  }
}
