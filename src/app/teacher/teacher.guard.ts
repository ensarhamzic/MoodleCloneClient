import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const isTeacher: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth)
    .subscribe((auth) => {
      console.log(auth);
      if (auth.role !== 'Teacher' || !auth.verified) {
        router.navigate(['/']);
      }
    });
  return true;
};
