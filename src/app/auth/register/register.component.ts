import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITip } from 'src/app/models/tip.model';
import { IZvanje } from 'src/app/models/zvanje.model';
import { TipService } from 'src/app/services/tip.service';
import { ZvanjeService } from 'src/app/services/zvanje.service';
import { RegisterValidators } from './register-validators';
import { EmailTakenValidator } from './email-taken-validator';
import { UsernameTakenValidator } from './username-taken-validator';
import { JMBGTakenValidator } from './jmbgtaken-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { register } from 'src/app/state/auth/auth.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  zvanja: IZvanje[] = [];
  tipovi: ITip[] = [];
  mode: string = 'student';

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
    Validators.minLength(8),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  adresa = new FormControl('', [Validators.required]);

  datumRodjenja = new FormControl('', [Validators.required]);
  godineRadnogStaza = new FormControl('', [Validators.required]);
  zvanjeId = new FormControl('', [Validators.required]);
  tipId = new FormControl('', [Validators.required]);

  studentForm: FormGroup = new FormGroup({});
  teacherForm: FormGroup = new FormGroup({});

  loggedIn$ = this.store.select((state) => state.auth.loggedIn);

  constructor(
    private zvanjeService: ZvanjeService,
    private tipService: TipService,
    private emailTakenValidator: EmailTakenValidator,
    private usernameTakenValidator: UsernameTakenValidator,
    private jmbgTakenValidator: JMBGTakenValidator,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.studentForm = new FormGroup(
      {
        jmbg: this.jmbg,
        ime: this.ime,
        prezime: this.prezime,
        pol: this.pol,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        adresa: this.adresa,
      },
      [RegisterValidators.match('password', 'confirmPassword')]
    );

    this.teacherForm = new FormGroup(
      {
        jmbg: this.jmbg,
        ime: this.ime,
        prezime: this.prezime,
        pol: this.pol,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        datumRodjenja: this.datumRodjenja,
        godineRadnogStaza: this.godineRadnogStaza,
        zvanjeId: this.zvanjeId,
        tipId: this.tipId,
      },
      [RegisterValidators.match('password', 'confirmPassword')]
    );

    this.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  onModeChange(mode: string) {
    if (mode === 'nastavnik' && this.tipovi.length === 0) {
      this.tipService.getAll().subscribe((tipovi) => {
        this.tipovi = tipovi;
        this.tipId.setValue(tipovi[0].id.toString());
      });
    }

    if (mode === 'nastavnik' && this.zvanja.length === 0) {
      this.zvanjeService.getAll().subscribe((zvanja) => {
        this.zvanja = zvanja;
        this.zvanjeId.setValue(zvanja[0].id.toString());
      });
    }
  }

  submitHandler() {
    if (this.mode === 'student' && this.studentForm.valid) {
      this.store.dispatch(
        register({ user: this.studentForm.value, regType: this.mode })
      );
    } else if (this.mode === 'nastavnik' && this.teacherForm.valid) {
      this.store.dispatch(
        register({ user: this.teacherForm.value, regType: this.mode })
      );
    }
  }
}
