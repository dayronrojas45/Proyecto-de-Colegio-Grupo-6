
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/alumnos';

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerUsuariosAlumnosDisponibles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`http://localhost:8080/api/usuarios`, {
      withCredentials: true,
    });
  }
  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/registro`, alumno, { withCredentials: true });
  }
  actualizarAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno, { withCredentials: true });
  }
  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
