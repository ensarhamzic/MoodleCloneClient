import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailTakenValidator } from 'src/app/auth/register/email-taken-validator';
import { JMBGTakenValidator } from 'src/app/auth/register/jmbgtaken-validator';
import { UsernameTakenValidator } from 'src/app/auth/register/username-taken-validator';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-novi-admin',
  templateUrl: './novi-admin.component.html',
  styleUrls: ['./novi-admin.component.scss'],
})
export class NoviAdminComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    private jmbgTakenValidator: JMBGTakenValidator,
    private usernameTakenValidator: UsernameTakenValidator,
    private emailTakenValidator: EmailTakenValidator,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.form = new FormGroup({
      jmbg: this.jmbg,
      ime: this.ime,
      prezime: this.prezime,
      pol: this.pol,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  jmbg = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]+$'),
    ],
    [this.jmbgTakenValidator.validate]
  );
  ime = new FormControl('', [Validators.required, Validators.minLength(2)]);
  prezime = new FormControl('', [Validators.required, Validators.minLength(2)]);
  pol = new FormControl('M', [Validators.required]);
  username = new FormControl(
    '',
    [Validators.required],
    [this.usernameTakenValidator.validate]
  );
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTakenValidator.validate]
  );
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  submitHandler() {
    if (this.form.valid) {
      this.adminService.registerAdmin(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Uspešno ste registrovali novog administratora!');
          this.form.reset();
        },
        error: () => {
          this.toastr.error('Došlo je do greške prilikom registracije!');
        },
      });
    }
  }
}
