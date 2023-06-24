import { Component } from '@angular/core';
import { IStudent } from 'src/app/models/student.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.scss'],
})
export class StudentiComponent {
  studenti: IStudent[] = [];

  constructor(private adminService: AdminService) {
    this.adminService.getStudents().subscribe((data) => {
      this.studenti = data;
    });
  }
}
