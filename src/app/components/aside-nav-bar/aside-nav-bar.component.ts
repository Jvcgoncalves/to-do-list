import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-aside-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <aside class="aside-menu py-5 col-3">
      <nav class="navbar w-100">
        <ul class="navbar-nav w-100 flex-column" >
          <li class="nav-item w-100 d-flex gap-3" *ngFor="let liElement of liElements">
            <img [src]="liElement.imgSrc" [alt]="liElement.alt">
            <a [routerLink]="liElement.goTo" class="nav-link">
              {{liElement.text}}
            </a>
          </li>
        </ul>
      </nav>
      
    </aside>
  `,
  styleUrl: './aside-nav-bar.component.scss'
})
export class AsideNavBarComponent implements OnInit {
  @Input() userId!: string | Users;
  liElements: {imgSrc: string, alt: string, text: string, goTo: string}[] = []
  constructor () { }

  ngOnInit(): void {
    this.liElements = [
      {
        imgSrc: "../../assets/task.svg",
        alt: "task-icon",
        text: "Tarefas",
        goTo: `/home/${this.userId}`
      },
      {
        imgSrc: "../../assets/settings.svg",
        alt: "settings-icon",
        text: "Configurações",
        goTo: ""
      },
      {
        imgSrc: "../../assets/user.svg",
        alt: "user-icon",
        text: "Perfil",
        goTo: ""
      },
      {
        imgSrc: "../../assets/sign_out.svg",
        alt: "sign out-icon",
        text: "Sair",
        goTo: ""
      }
    ]
  }
}
