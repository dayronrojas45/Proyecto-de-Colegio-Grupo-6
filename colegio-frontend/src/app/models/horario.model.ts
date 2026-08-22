export interface HorarioDTO {
  idHorario: number;
  idProfesorCurso: number;
  nombreProfesor: string;
  nombreCurso: string;
  idAula: number;
  seccionAula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export interface CrearHorarioRequestDTO {
  idProfesorCurso: number;
  idAula: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
}
