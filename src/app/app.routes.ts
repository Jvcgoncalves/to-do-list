import { Routes } from '@angular/router';
import { SignUpLoginComponent } from './sign-up-login/sign-up-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  {
    path: "",
    component: SignUpLoginComponent,
    title: "Sign Up - Login Page"
  },
  {
    path: "home/:userId",
    component: HomePageComponent,
    title: "Home Page",
    children: [
      {
        path: "",
        component: TaskComponent,
      }
    ]
  }
];

export default routes
