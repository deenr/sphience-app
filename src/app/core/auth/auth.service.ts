import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '@core/models/user';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentTokenSubject$ = new BehaviorSubject<string | null>(null);

  public get currentToken() {
    return this._currentTokenSubject$.value;
  }

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signin`, { email, password }).pipe(
      map(({ accessToken }) => {
        this._currentTokenSubject$.next(accessToken);

        return accessToken;
      })
    );
  }

  public register(email: string, password: string, firstName: string, lastName: string, role: UserRole): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/signup`, { email, password, firstName, lastName, role }).pipe(
      map(({ accessToken }) => {
        this._currentTokenSubject$.next(accessToken);

        return accessToken;
      })
    );
  }

  public logout() {
    this._currentTokenSubject$.next(null);
  }
}
