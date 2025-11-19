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
import { GoodDeedsComponent } from './pages/dashboard/good-deeds/good-deeds.component';
import { GoodDeedComponent } from './components/good-deed/good-deed.component';
import { CreateGoodDeedComponent } from './pages/dashboard/create-good-deed/create-good-deed.component';
import { ShowGoodDeedComponent } from './pages/dashboard/show-good-deed/show-good-deed.component';

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
    children: [
      {
        path: '',
        component: GoodDeedsComponent,
      },
      {
        path: 'goodDeed/:id',
        component: ShowGoodDeedComponent,
      },
      {
        path: 'createGoodDeed/:id',
        component: CreateGoodDeedComponent,
      },
    ],
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
