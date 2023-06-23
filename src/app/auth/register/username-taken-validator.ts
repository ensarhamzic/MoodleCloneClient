import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UsernameTakenValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    let returnValue = null;
    return this.authService.usernameTaken(control.value).pipe(
      map((res) => {
        if (res) {
          returnValue = { usernameTaken: true };
        } else {
          returnValue = null;
        }
        return returnValue;
      })
    );
  };
}
