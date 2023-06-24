import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  role$ = this.store.select((state) => state.auth.role);

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logout());
  }
}
