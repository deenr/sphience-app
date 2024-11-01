import { AbstractControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Creates an observable that tracks remaining characters for a form control
 * @param control The form control to track
 * @param maxChars Maximum allowed characters
 * @returns Observable<number> Number of characters remaining
 */
export function createRemainingCharsObservable(control: AbstractControl, maxChars: number): Observable<number> {
  const calculateRemaining = (value: string | null): number => {
    if (!value) {
      return maxChars;
    }
    return Math.max(0, maxChars - value.length);
  };

  const initial$ = new Observable<number>((subscriber) => {
    subscriber.next(calculateRemaining(control.value));
  });
  const changes$ = control.valueChanges.pipe(map((value) => calculateRemaining(value)));

  return merge(initial$, changes$);
}
