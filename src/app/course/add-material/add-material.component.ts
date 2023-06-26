import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent {
  form: FormGroup;
  naziv: FormControl = new FormControl('', Validators.required);
  fileName: FormControl = new FormControl('', Validators.required);
  file: File | null = null;
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      naziv: this.naziv,
      fileName: this.fileName,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = {
      naziv: this.form.value.naziv,
      file: this.file,
    };

    this.loading = true;
    this.route.params.subscribe((params) => {
      const kursId = params.id;
      this.courseService.dodajMaterijal(kursId, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/courses', kursId]);
      });
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.file = file;
  }
}
