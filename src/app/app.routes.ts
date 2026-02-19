import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
];
