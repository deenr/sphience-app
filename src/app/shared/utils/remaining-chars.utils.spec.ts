import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { createRemainingCharsObservable } from './remaining-chars.utils';

describe('RemainingCharsUtils', () => {
  describe('createRemainingCharsObservable', () => {
    it('should return maxChars when control value is empty', async () => {
      const control = new FormControl('');
      const maxChars = 100;

      const remaining = await firstValueFrom(createRemainingCharsObservable(control, maxChars));

      expect(remaining).toBe(maxChars);
    });

    it('should return maxChars when control value is null', async () => {
      const control = new FormControl(null);
      const maxChars = 100;

      const remaining = await firstValueFrom(createRemainingCharsObservable(control, maxChars));

      expect(remaining).toBe(maxChars);
    });

    it('should calculate remaining chars correctly', async () => {
      const control = new FormControl('Hello');
      const maxChars = 10;

      const remaining = await firstValueFrom(createRemainingCharsObservable(control, maxChars));

      expect(remaining).toBe(5);
    });

    it('should update remaining chars when value changes', async () => {
      const control = new FormControl('Hello Joe');
      const maxChars = 10;

      const observable = createRemainingCharsObservable(control, maxChars);
      const initial = await firstValueFrom(observable);

      expect(initial).toBe(1);

      control.setValue('Hello');
      const afterChange = await firstValueFrom(observable);

      expect(afterChange).toBe(5);
    });

    it('should not return negative remaining chars', async () => {
      const control = new FormControl('This is a very long text');
      const maxChars = 10;

      const remaining = await firstValueFrom(createRemainingCharsObservable(control, maxChars));

      expect(remaining).toBe(0);
    });
  });
});
