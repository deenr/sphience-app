// character-counter.utility.ts
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * Creates an observable that tracks remaining characters for a form control
 * @param control The form control to track
 * @param maxChars Maximum allowed characters
 * @returns Observable<number> Number of characters remaining
 */
export function createRemainingCharsObservable(control: AbstractControl, maxChars: number): Observable<number> {
  return control.valueChanges.pipe(
    startWith(control.value),
    map((value: string) => {
      if (!value) return maxChars;
      const remaining = maxChars - value.length;
      return Math.max(0, remaining);
    })
  );
}
