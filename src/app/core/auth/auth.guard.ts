import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getItem(AuthService.TOKEN_KEY);

  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

function isTokenExpired(exp: number): boolean {
  if (exp) {
    return 1000 * exp - new Date().getTime() < 5000;
  } else {
    return false;
  }
}
