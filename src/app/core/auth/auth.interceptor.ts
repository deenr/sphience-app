import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const correntToken = this.authService.currentToken;
    console.log(correntToken);

    if (correntToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${correntToken}`
        }
      });
    }

    return next.handle(request);
  }
}
