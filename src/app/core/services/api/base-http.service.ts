import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  public getAll<T>(endpoint: string, params?: any): Observable<T[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  public get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  public post<T, D>(endpoint: string, body: D): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  public patch<T, D>(endpoint: string, body: D): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
