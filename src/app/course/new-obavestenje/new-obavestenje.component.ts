import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-new-obavestenje',
  templateUrl: './new-obavestenje.component.html',
  styleUrls: ['./new-obavestenje.component.scss'],
})
export class NewObavestenjeComponent {
  form: FormGroup = new FormGroup({});
  courseId: number = 0;

  naslov: FormControl = new FormControl('', [Validators.required]);
  sadrzaj: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      naslov: this.naslov,
      sadrzaj: this.sadrzaj,
    });

    this.route.params.subscribe((params) => {
      this.courseId = params.id;
    });
  }

  submit() {
    if (this.form.invalid) return;

    var data = {
      naslov: this.naslov.value,
      sadrzaj: this.sadrzaj.value,
      kursId: this.courseId,
    };

    this.courseService.addNews(data).subscribe((data) => {
      this.toastr.success('Obavestenje uspesno dodato!');
      this.router.navigate(['/courses', this.courseId]);
    });
  }
}
