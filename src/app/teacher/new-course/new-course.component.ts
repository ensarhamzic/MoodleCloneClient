import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISmer } from 'src/app/models/smer.module';
import { ITeacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent {
  form: FormGroup = new FormGroup({});

  naziv: FormControl = new FormControl('', [Validators.required]);
  hronoloskiMod: FormControl = new FormControl(true, [Validators.required]);
  smerId: FormControl = new FormControl('', [Validators.required]);
  asistentJMBG: FormControl = new FormControl('', [Validators.required]);

  smerovi: ISmer[] = [];
  asistenti: ITeacher[] = [];

  constructor(
    private teacherService: TeacherService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = new FormGroup({
      naziv: this.naziv,
      hronoloskiMod: this.hronoloskiMod,
      smerId: this.smerId,
      asistentJMBG: this.asistentJMBG,
    });

    this.teacherService.getSmerovi().subscribe((smerovi) => {
      this.smerovi = smerovi;
      if (smerovi.length > 0) this.smerId.setValue(smerovi[0].id);
    });

    this.teacherService.getAsistenti().subscribe((asistenti) => {
      this.asistenti = asistenti;
      if (asistenti.length > 0)
        this.asistentJMBG.setValue(asistenti[0].osoba.jmbg);
    });
  }

  submitHandler() {
    if (this.form.valid) {
      this.teacherService.addCourse(this.form.value).subscribe((res) => {
        this.toastr.success('Uspesno dodat kurs');
        this.router.navigate(['/teacher/courses']);
      });
    }
  }
}
