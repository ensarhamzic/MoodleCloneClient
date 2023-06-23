import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class JMBGTakenValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    let returnValue = null;
    return this.authService.JMBGTaken(control.value).pipe(
      map((res) => {
        if (res) {
          returnValue = { JMBGTaken: true };
        } else {
          returnValue = null;
        }
        return returnValue;
      })
    );
  };
}
