import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailTakenValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    let returnValue = null;
    return this.authService.emailTaken(control.value).pipe(
      map((emailTaken) => {
        if (emailTaken) {
          returnValue = { emailTaken: true };
        } else {
          returnValue = null;
        }
        return returnValue;
      })
    );
  };
}
