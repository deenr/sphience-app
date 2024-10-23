import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public isRefreshingToken = false;

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem(AuthService.TOKEN_KEY);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !request.url.includes('login') && !request.url.includes('register') && error.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      return this.authService.refreshToken().pipe(
        switchMap((token: string) => {
          this.isRefreshingToken = false;

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(request);
        }),
        catchError((err) => {
          this.isRefreshingToken = false;

          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
