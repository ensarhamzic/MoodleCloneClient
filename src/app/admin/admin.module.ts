import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NastavniciComponent } from './nastavnici/nastavnici.component';
import { StudentiComponent } from './studenti/studenti.component';
import { NoviAdminComponent } from './novi-admin/novi-admin.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { RouterModule } from '@angular/router';
import { DodajSmerComponent } from './dodaj-smer/dodaj-smer.component';

@NgModule({
  declarations: [
    NastavniciComponent,
    StudentiComponent,
    NoviAdminComponent,
    StudentComponent,
    DodajSmerComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
})
export class AdminModule {}
