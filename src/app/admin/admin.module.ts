import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NastavniciComponent } from './nastavnici/nastavnici.component';
import { StudentiComponent } from './studenti/studenti.component';
import { NoviAdminComponent } from './novi-admin/novi-admin.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NastavniciComponent, StudentiComponent, NoviAdminComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class AdminModule {}
