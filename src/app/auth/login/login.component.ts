import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { login } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  loginError$ = this.store.select((state) => state.auth.error);
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loading$ = this.store.select((state) => state.auth.loading);
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  password = new FormControl('', [Validators.required]);

  constructor(private store: Store<AppState>, private router: Router) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });

    this.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  submitHandler = () => {
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          username: this.username.value!,
          password: this.password.value!,
        })
      );
    }
  };
}
