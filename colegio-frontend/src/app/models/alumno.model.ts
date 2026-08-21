import { Usuario } from './usuario.model';

export interface Alumno {
  idAlumno: number;
  usuario: Usuario;
  dni: string;
  nombres: string;
  apellidos: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  sexo?: string;
}
