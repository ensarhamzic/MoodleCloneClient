import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dodaj-smer',
  templateUrl: './dodaj-smer.component.html',
  styleUrls: ['./dodaj-smer.component.scss'],
})
export class DodajSmerComponent {
  form: FormGroup = new FormGroup({});
  naziv: FormControl = new FormControl('');
  loading = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      naziv: this.naziv,
    });
  }

  onSubmit = () => {
    if (this.form.invalid) return;
    this.loading = true;
    this.adminService.addSmer(this.naziv.value).subscribe({
      next: () => {
        this.loading = false;
        this.naziv.setValue('');
        this.toastr.success('Smer uspešno dodat!');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      },
    });
  };
}
