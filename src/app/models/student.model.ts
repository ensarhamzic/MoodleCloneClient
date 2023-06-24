import { IStudentSmer } from './student-smer';
import { IUser } from './user.model';

export interface IStudent {
  osoba: IUser;
  adresa: string;
  smerovi: IStudentSmer[];
}
