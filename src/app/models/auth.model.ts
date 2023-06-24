import { IUser } from './user.model';

export interface IAuth {
  osoba: IUser;
  token: string;
  role: string;
  verified: boolean;
}
