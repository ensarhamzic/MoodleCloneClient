import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStudent } from 'src/app/models/student.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.component.html',
  styleUrls: ['./prijave.component.scss'],
})
export class PrijaveComponent {
  studenti: IStudent[] = [];
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getPrijaveNaKurs(params.id).subscribe((data) => {
        this.studenti = data;
      });
    });
  }

  private ogovoriNaPrijavu(studentJMBG: string, odgovor: boolean) {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.courseService
        .odgovoriNaPrijavu(params.id, studentJMBG, odgovor)
        .subscribe(() => {
          this.loading = false;
          this.studenti = this.studenti.filter(
            (student) => student.osoba.jmbg !== studentJMBG
          );
          this.toastr.success(
            `Uspešno ste ${odgovor ? 'prihvatili' : 'odbili'} prijavu studenta`
          );
        });
    });
  }

  prihvatiPrijavu(studentJMBG: string) {
    this.ogovoriNaPrijavu(studentJMBG, true);
  }

  odbijPrijavu(studentJMBG: string) {
    this.ogovoriNaPrijavu(studentJMBG, false);
  }
}
