import { Alumno } from './alumno.model';
import { HorarioDTO } from './horario.model';

export interface AsistenciaDTO {
  idAsistencia: number;
  alumno: Alumno;
  horario: HorarioDTO;
  fecha: string;
  estado: 'PRESENTE' | 'AUSENTE' | 'TARDANZA' | 'JUSTIFICADO';
}
