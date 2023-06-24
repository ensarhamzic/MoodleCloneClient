import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class IndexTakenValidator implements AsyncValidator {
  constructor(private adminService: AdminService) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    let returnValue = null;
    return this.adminService.indexTaken(control.value).pipe(
      tap((indexTaken) => console.log(indexTaken)),
      map((indexTaken) => {
        if (indexTaken) {
          returnValue = { indexTaken: true };
        } else {
          returnValue = null;
        }
        return returnValue;
      })
    );
  };
}
