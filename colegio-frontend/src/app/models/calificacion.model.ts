import { Alumno } from './alumno.model';
import { ProfesorCursoDTO } from './profesor-curso.model';

export interface CalificacionDTO {
  idCalificacion: number;
  alumno: Alumno;
  profesorCurso: ProfesorCursoDTO;
  bimestre: number;
  pc1: number;
  pc2: number;
  examenFinal: number;
  promedio: number;
}
