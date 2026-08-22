
import { Nivel } from './nivel.model';
import { Grado } from './grado.model';
import { Profesor } from './profesor.model';

export interface Aula {
  idAula: number;
  nivel: Nivel;
  grado: Grado;
  seccion: string;
  capacidad: number;
  tutor: Profesor;
}
