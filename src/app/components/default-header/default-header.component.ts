import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
      <nav class="navbar h-100 w-100 mx-auto">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a routerLink="home/:userId" class="nav-link d-flex align-items-center gap-3">
              <span class="square"></span>
              manage your tasks
            </a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent {

}
