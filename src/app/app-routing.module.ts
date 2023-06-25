import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { loggedOut } from './auth/auth.guard';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { TeacherRoutingModule } from './teacher/teacher-routing.module';
import { CourseRoutingModule } from './course/course-routing.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOut],
  },
  { path: 'register', component: RegisterComponent, canActivate: [loggedOut] },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    TeacherRoutingModule,
    CourseRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
