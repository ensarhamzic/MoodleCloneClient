import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { loggedOut } from './auth/auth.guard';
import { AdminRoutingModule } from './admin/admin-routing.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOut],
  },
  { path: 'register', component: RegisterComponent, canActivate: [loggedOut] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
