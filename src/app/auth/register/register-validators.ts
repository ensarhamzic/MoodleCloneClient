import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        console.error('Control or matching control not found!');
        return null;
      }

      const error = control.value !== matchingControl.value;

      if (error) {
        matchingControl.setErrors({ noMatch: true });
        return { noMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
