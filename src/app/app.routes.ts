import { Routes } from '@angular/router';
import { SignUpLoginComponent } from './components/sign-up-login/sign-up-login.component';
import { DefaultlayoutComponent } from './components/default-layout/default-layout.component';
import { HomePageComponent } from './components/default-layout/home-page/home-page.component';
import { ProfilePageComponent } from './components/default-layout/profile-page/profile-page.component';
import { TaskComponent } from './components/default-layout/home-page/task/task.component';
import { AddNewTaskComponent } from './components/default-layout/home-page/add-new-task/add-new-task.component';
import { SeeSingleTaskComponent } from './components/default-layout/see-single-task/see-single-task.component';

const routes: Routes = [
  {
    path: "",
    component: SignUpLoginComponent,
    title: "Sign Up - Login Page"
  },
  {
    path: "user-logged/:userId",
    component: DefaultlayoutComponent,
    children: [
      {
        path: "",
        component: HomePageComponent,
        title: "Home Page",
        children: [
          {
            path: "tasks",
            component: TaskComponent
          },
          {
            path: "add-new-task",
            component: AddNewTaskComponent
          }
        ]
      },
      {
        path: "profile",
        component: ProfilePageComponent,
        title: "Profile Page"
      },
      {
        path: "task/:taskId",
        component: SeeSingleTaskComponent,
        title: "Task Page"
      }
    ]
  }
];

export default routes
