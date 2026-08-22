import { Alumno } from './alumno.model';
import { Aula } from './aula.model';

export interface MatriculaDTO {
  idMatricula: number;
  alumno: Alumno;
  aula: Aula;
  anio: string;
  fecha: string;
  estado: 'ACTIVO' | 'RETIRADO';
}
