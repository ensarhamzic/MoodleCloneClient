import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [InputComponent, SearchComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, SearchComponent],
})
export class SharedModule {}
