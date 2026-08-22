import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesorCursoDTO } from '../models/profesor-curso.model';
import { Profesor } from '../models/profesor.model';
import { CursoGradoDTO } from '../models/curso-grado.model';

@Injectable({
  providedIn: 'root',
})
export class ProfesorCursoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/profesores-cursos';

  obtenerAsignaciones(): Observable<ProfesorCursoDTO[]> {
    return this.http.get<ProfesorCursoDTO[]>(this.apiUrl, { withCredentials: true });
  }

  crearAsignacion(profesorCurso: ProfesorCursoDTO): Observable<ProfesorCursoDTO> {
    return this.http.post<ProfesorCursoDTO>(this.apiUrl, profesorCurso, { withCredentials: true });
  }

  // 👇 MÉTODO PARA EDITAR (Ahora ya existe en el backend)
  actualizarAsignacion(id: number, profesorCurso: ProfesorCursoDTO): Observable<ProfesorCursoDTO> {
    return this.http.put<ProfesorCursoDTO>(`${this.apiUrl}/${id}`, profesorCurso, {
      withCredentials: true,
    });
  }

  eliminarAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>('http://localhost:8080/api/profesores', {
      withCredentials: true,
    });
  }

  obtenerCursoGrados(): Observable<CursoGradoDTO[]> {
    return this.http.get<CursoGradoDTO[]>('http://localhost:8080/api/cursos-grado', {
      withCredentials: true,
    });
  }
}
