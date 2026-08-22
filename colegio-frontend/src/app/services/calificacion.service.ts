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

  obtenerCalificaciones(): Observable<CalificacionDTO[]> {
    return this.http.get<CalificacionDTO[]>(this.apiUrl, { withCredentials: true });
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

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>('http://localhost:8080/api/alumnos', { withCredentials: true });
  }

  obtenerProfesoresCursos(): Observable<ProfesorCursoDTO[]> {
    return this.http.get<ProfesorCursoDTO[]>('http://localhost:8080/api/profesores-cursos', {
      withCredentials: true,
    });
  }
}
