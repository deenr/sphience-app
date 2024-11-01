import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public error(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.error(message, ...args);
    }
    // You could add error reporting service integration here
  }

  public warn(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.warn(message, ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.info(message, ...args);
    }
  }

  public debug(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.debug(message, ...args);
    }
  }
}
