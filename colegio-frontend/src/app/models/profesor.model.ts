import { Usuario } from './usuario.model';

export interface Profesor {
  idProfesor: number;
  usuario: Usuario;
  dni: string;
  nombres: string;
  apellidos: string;
  correo?: string;
  telefono?: string;
  especialidad?: string;
}
