import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISmer } from 'src/app/models/smer.module';
import { IStudent } from 'src/app/models/student.model';
import { AdminService } from 'src/app/services/admin.service';
import { IndexTakenValidator } from './index-taken-validator';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  student!: IStudent;
  smerovi: ISmer[] = [];
  form: FormGroup = new FormGroup({});
  smerId: FormControl = new FormControl('', Validators.required);
  brojIndeksa: FormControl = new FormControl(
    '',
    [Validators.required],
    [this.indexTaken.validate]
  );

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private indexTaken: IndexTakenValidator
  ) {
    route.params.subscribe((params) => {
      const jmbg = params.jmbg;
      this.adminService.getStudent(jmbg).subscribe((student) => {
        this.student = student;
        adminService.getSmerovi().subscribe((smerovi) => {
          var neupisaniSmerovi = smerovi.filter(
            (smer) => !student.smerovi.map((s) => s.smer.id).includes(smer.id)
          );
          this.smerovi = neupisaniSmerovi;
          this.smerId.setValue(neupisaniSmerovi[0]?.id);
        });
      });
    });

    this.form = new FormGroup({
      smerId: this.smerId,
      brojIndeksa: this.brojIndeksa,
    });
  }

  upisi() {
    if (!this.form.valid) return;
    this.adminService
      .dodajStudentaNaSmer(
        this.student.osoba.jmbg,
        this.smerId.value,
        this.brojIndeksa.value
      )
      .subscribe((data) => {
        this.adminService
          .getStudent(this.student.osoba.jmbg)
          .subscribe((student) => {
            this.student = student;
            var neupisaniSmerovi = this.smerovi.filter(
              (smer) => !student.smerovi.map((s) => s.smer.id).includes(smer.id)
            );
            this.smerovi = neupisaniSmerovi;
            this.form.reset();
            this.smerId.setValue(neupisaniSmerovi[0]?.id);
          });
      });
  }
}
