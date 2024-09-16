import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserRole } from '@core/models/user';
import { environment } from '@environments/environment';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentSessionToken$ = new Subject<string | null>();

  public get currentSessionToken$(): Observable<string | null> {
    return this._currentSessionToken$.asObservable();
  }

  public constructor(private http: HttpClient) {
    this.http
      .get<{ accessToken: string }>(`${environment.apiUrl}/auth/token`, { withCredentials: true })
      .pipe(
        map(({ accessToken }) => {
          this._currentSessionToken$.next(accessToken);
          return accessToken;
        }),
        catchError((error) => {
          this._currentSessionToken$.error(error);
          return [];
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  public login(email: string, password: string): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signin`, { email, password }, { withCredentials: true }).pipe(
      map(({ accessToken }) => {
        this._currentSessionToken$.next(accessToken);

        return accessToken;
      })
    );
  }

  public register(email: string, password: string, firstName: string, lastName: string, role: UserRole): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signup`, { email, password, firstName, lastName, role }, { withCredentials: true }).pipe(
      map(({ accessToken }) => {
        this._currentSessionToken$.next(accessToken);

        return accessToken;
      })
    );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/signout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this._currentSessionToken$.next(null);
      })
    );
  }
}
