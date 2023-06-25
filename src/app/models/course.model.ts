import { IMaterijal } from './materijal.model';
import { ISmer } from './smer.module';
import { ITeacher } from './teacher.model';

export interface ICourse {
  id: number;
  naziv: string;
  smer: ISmer;
  asistent: ITeacher;
  profesor: ITeacher;
  materijali: IMaterijal[];
}
