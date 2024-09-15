import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule),
    canActivate: [authGuard]
  }
];
