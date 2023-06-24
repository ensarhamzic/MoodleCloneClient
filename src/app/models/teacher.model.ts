import { ITip } from './tip.model';
import { IUser } from './user.model';
import { IZvanje } from './zvanje.model';

export interface ITeacher {
  osoba: IUser;
  datumRodjenja: Date;
  godineRadnogStaza: number;
  zvanje: IZvanje;
  tip: ITip;
}
