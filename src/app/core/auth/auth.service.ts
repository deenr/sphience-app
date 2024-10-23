import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '@core/models/user';
import { LocalStorageService } from '@core/services/local-storage.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly TOKEN_KEY = 'TOKEN_KEY';

  public constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public login(email: string, password: string): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signin`, { email, password }, { withCredentials: true }).pipe(
      map(({ accessToken }) => {
        this.localStorageService.setItem(AuthService.TOKEN_KEY, accessToken);

        return accessToken;
      })
    );
  }

  public register(email: string, password: string, firstName: string, lastName: string, role: UserRole): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signup`, { email, password, firstName, lastName, role }, { withCredentials: true }).pipe(
      map(({ accessToken }) => {
        this.localStorageService.setItem(AuthService.TOKEN_KEY, accessToken);

        return accessToken;
      })
    );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/signout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.localStorageService.removeItem(AuthService.TOKEN_KEY);
      })
    );
  }

  public refreshToken(): Observable<string> {
    return this.http.get<{ accessToken: string }>(`${environment.apiUrl}/auth/refresh`, { withCredentials: true }).pipe(
      map(({ accessToken }) => {
        this.localStorageService.setItem(AuthService.TOKEN_KEY, accessToken);

        return accessToken;
      })
    );
  }
}
