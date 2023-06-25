import { ICourse } from './course.model';
import { ITeacher } from './teacher.model';

export interface IObavestenje {
  id: number;
  naslov: string;
  sadrzaj: string;
  datum: Date;
  kurs: ICourse;
  nastavnik: ITeacher;
}
