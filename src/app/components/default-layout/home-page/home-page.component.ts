import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  userId!: string | null;
  user_name!: string;
  errorOnLoadData: boolean = false; 
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userLoggedId");
    
    if(!this.userId) {
      this.errorOnLoadData = true;
      return;
    }

    this.userService.getUserData({userId: this.userId})
    .then(res => {
      if(typeof res === 'string'){
        this.errorOnLoadData = true;
        return;
      }
      this.user_name = res.user_name;
    })
    .catch( err =>{
      this.errorOnLoadData = true;
    })
  }
}
