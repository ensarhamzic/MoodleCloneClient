import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  role$ = this.store.select((state) => state.auth.role);

  isCollapsed = true;

  constructor(private store: Store<AppState>, private router: Router) {}

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
