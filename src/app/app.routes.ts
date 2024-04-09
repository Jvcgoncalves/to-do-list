import { Routes } from '@angular/router';
import { SignUpLoginComponent } from './components/sign-up-login/sign-up-login.component';
import { DefaultlayoutComponent } from './components/default-layout/default-layout.component';
import { HomePageComponent } from './components/default-layout/home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    component: SignUpLoginComponent,
    title: "Sign Up - Login Page"
  },
  {
    path: "home/:userId",
    component: DefaultlayoutComponent,
    title: "Home Page",
    children: [
      {
        path: "",
        component: HomePageComponent,
      }
    ]
  }
];

export default routes
