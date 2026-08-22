import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalificacionDTO } from '../models/calificacion.model';
import { Alumno } from '../models/alumno.model';
import { ProfesorCursoDTO } from '../models/profesor-curso.model';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/calificaciones';
  private apiUrlAlumnos = 'http://localhost:8080/api/alumnos';
  private apiUrlProfesorCurso = 'http://localhost:8080/api/profesor-curso';
  private apiUrlProfesorCursoAlt = 'http://localhost:8080/api/profesores-cursos';

  obtenerCalificaciones(): Observable<CalificacionDTO[]> {
    return this.http.get<CalificacionDTO[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrlAlumnos, { withCredentials: true });
  }

  obtenerProfesoresCursos(): Observable<ProfesorCursoDTO[]> {
    return this.http.get<ProfesorCursoDTO[]>(this.apiUrlProfesorCurso, { withCredentials: true });
  }

  obtenerProfesoresCursosAlternativo(): Observable<ProfesorCursoDTO[]> {
    return this.http.get<ProfesorCursoDTO[]>(this.apiUrlProfesorCursoAlt, {
      withCredentials: true,
    });
  }

  crearCalificacion(calificacion: CalificacionDTO): Observable<CalificacionDTO> {
    return this.http.post<CalificacionDTO>(this.apiUrl, calificacion, { withCredentials: true });
  }

  actualizarCalificacion(id: number, calificacion: CalificacionDTO): Observable<CalificacionDTO> {
    return this.http.put<CalificacionDTO>(`${this.apiUrl}/${id}`, calificacion, {
      withCredentials: true,
    });
  }

  eliminarCalificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
