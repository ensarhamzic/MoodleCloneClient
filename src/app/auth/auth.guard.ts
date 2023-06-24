import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const loggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.loggedIn)
    .subscribe((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/login']);
      }
    });
  return true;
};

export const loggedOut: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.loggedIn)
    .subscribe((loggedIn) => {
      console.log(loggedIn);
      if (loggedIn) {
        router.navigate(['/home']);
      }
    });
  return true;
};
