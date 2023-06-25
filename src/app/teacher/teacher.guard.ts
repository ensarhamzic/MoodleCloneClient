import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const isTeacher: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.role)
    .subscribe((role) => {
      console.log(role);
      if (role !== 'Profesor' && role !== 'Asistent') {
        router.navigate(['/']);
      }
    });
  return true;
};

export const isProfesor: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.role)
    .subscribe((role) => {
      if (role !== 'Profesor') {
        router.navigate(['/']);
      }
    });
  return true;
};

export const isAsistent: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.role)
    .subscribe((role) => {
      if (role !== 'Asistent') {
        router.navigate(['/']);
      }
    });
  return true;
};
