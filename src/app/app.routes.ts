import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule) }];
