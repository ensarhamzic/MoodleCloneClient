import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import {
  checkToken,
  checkTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ user, regType }) => {
        let obs: Observable<any>;
        if (regType === 'student') obs = this.authService.registerStudent(user);
        else if (regType === 'nastavnik')
          obs = this.authService.registerTeacher(user);
        else if (regType === 'admin')
          obs = this.authService.registerAdmin(user);
        else obs = this.authService.registerStudent(user);

        return from(obs).pipe(
          map((data) => registerSuccess({ data })),
          catchError((error) =>
            of(registerFailure({ error: error.error.message }))
          )
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((data) => loginSuccess({ data })),
          catchError((error) =>
            of(loginFailure({ error: error.error.message }))
          )
        );
      })
    )
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkToken),
      tap((data) => console.log(data)),
      switchMap(({ token }) => {
        return this.authService
          .checktoken(token)
          .pipe(map((data) => checkTokenSuccess({ data })));
      })
    )
  );
}
