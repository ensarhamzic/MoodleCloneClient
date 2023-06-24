import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { loggedIn, loggedOut } from './auth/auth.guard';
import { NastavniciComponent } from './admin/nastavnici/nastavnici.component';
import { StudentiComponent } from './admin/studenti/studenti.component';
import { NoviAdminComponent } from './admin/novi-admin/novi-admin.component';
import { isAdmin } from './admin/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOut],
  },
  { path: 'register', component: RegisterComponent, canActivate: [loggedOut] },
  {
    path: 'admin/nastavnici',
    component: NastavniciComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'admin/studenti',
    component: StudentiComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'admin/novi-admin',
    component: NoviAdminComponent,
    canActivate: [isAdmin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
