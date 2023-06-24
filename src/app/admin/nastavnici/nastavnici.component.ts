import { Component } from '@angular/core';
import { ITeacher } from 'src/app/models/teacher.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-nastavnici',
  templateUrl: './nastavnici.component.html',
  styleUrls: ['./nastavnici.component.scss'],
})
export class NastavniciComponent {
  nastavnici: ITeacher[] = [];

  constructor(private adminService: AdminService) {
    this.adminService.getUnverifiedTeachers().subscribe((nastavnici) => {
      console.log(nastavnici);
      this.nastavnici = nastavnici;
    });
  }

  deleteTeacher(jmbg: string) {
    console.log(jmbg);
    this.adminService.deleteTeacher(jmbg).subscribe((res) => {
      this.nastavnici = this.nastavnici.filter(
        (nastavnik) => nastavnik.osoba.jmbg !== jmbg
      );
    });
  }

  verifyTeacher(jmbg: string) {
    this.adminService.verifyTeacher(jmbg).subscribe((res) => {
      console.log(res);
      this.nastavnici = this.nastavnici.filter(
        (nastavnik) => nastavnik.osoba.jmbg !== jmbg
      );
    });
  }
}
