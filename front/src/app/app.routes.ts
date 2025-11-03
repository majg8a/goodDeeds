import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {
  redirectUnauthorizedTo,
  AuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { RegisterComponent } from './pages/register/register.component';
import { UserService } from './services/user.service';

const redirectToLogin = () => redirectUnauthorizedTo('/login');
const redirectToDashboard = () => redirectLoggedInTo('/dashboard');

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectToDashboard,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectToDashboard,
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    resolve: { user: UserService },
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
