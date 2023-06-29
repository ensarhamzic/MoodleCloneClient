import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NastavniciComponent } from './nastavnici/nastavnici.component';
import { isAdmin } from './admin.guard';
import { StudentiComponent } from './studenti/studenti.component';
import { NoviAdminComponent } from './novi-admin/novi-admin.component';
import { StudentComponent } from './student/student.component';
import { DodajSmerComponent } from './dodaj-smer/dodaj-smer.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [isAdmin],
    children: [
      {
        path: 'nastavnici',
        component: NastavniciComponent,
      },
      {
        path: 'studenti',
        component: StudentiComponent,
      },
      {
        path: 'studenti/:jmbg',
        component: StudentComponent,
      },
      {
        path: 'novi-admin',
        component: NoviAdminComponent,
      },
      {
        path: 'dodaj-smer',
        component: DodajSmerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
