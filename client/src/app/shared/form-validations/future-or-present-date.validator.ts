import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrPresentDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(control.value);

    return dateToCheck >= today ? null : { futureOrPresentDate: 'Please enter a present or future date' };
  };
}
