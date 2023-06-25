import { ICourse } from './course.model';

export interface ISmer {
  id: number;
  naziv: string;
  brojIndeksa: string;
  kursevi: ICourse[];
}
