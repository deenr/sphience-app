import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshingToken = false;

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getItem(AuthService.TOKEN_KEY);

  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (!req.url.includes('login') && !req.url.includes('register') && error.status === 401) {
          return handle401Error(clonedRequest, next, authService);
        }
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<unknown>> {
  if (!isRefreshingToken) {
    isRefreshingToken = true;

    return authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        isRefreshingToken = false;

        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        });

        return next(newRequest);
      }),
      catchError((err) => {
        isRefreshingToken = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  }

  return new Observable((subscriber) => {
    const intervalId = setInterval(() => {
      if (!isRefreshingToken) {
        clearInterval(intervalId);
        next(req).subscribe(subscriber);
      }
    }, 100);
  });
}
