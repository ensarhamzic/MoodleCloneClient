import { ISmer } from './smer.module';
import { IUser } from './user.model';

export interface IStudentSmer {
  smer: ISmer;
  osoba: IUser;
  brojIndeksa: string;
}
