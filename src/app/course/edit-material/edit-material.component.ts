import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaterijal } from 'src/app/models/materijal.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss'],
})
export class EditMaterialComponent {
  materijal!: IMaterijal;

  form: FormGroup = new FormGroup({});
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

    const materialId = this.route.snapshot.params.materijalId;
    this.courseService.getMaterijal(materialId).subscribe({
      next: (data) => {
        this.materijal = data;
        this.naziv.setValue(data.naziv);
      },
    });
  }

  izbrisiMaterijal() {
    this.courseService.izbrisiMaterijal(this.materijal.id).subscribe(() => {
      this.router.navigate(['/courses', this.materijal.kursId]);
    });
  }

  onSubmit() {
    console.log('ENSAR');
    console.log(this.form.value);
    if (this.form.invalid) return;

    const data = {
      naziv: this.form.value.naziv,
      file: this.file,
    };

    this.loading = true;
    this.courseService
      .azurirajMaterijal(this.materijal.id, data)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/courses', this.materijal.kursId]);
      });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.file = file;
  }

  ponisti() {
    this.router.navigate(['/courses', this.materijal.kursId]);
  }
}
