import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoGradoDTO } from '../models/curso-grado.model';
import { Curso } from '../models/curso.model';
import { Nivel } from '../models/nivel.model';
import { Grado } from '../models/grado.model';

@Injectable({
  providedIn: 'root',
})
export class CursoGradoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/cursos-grado';

  obtenerAsignaciones(): Observable<CursoGradoDTO[]> {
    return this.http.get<CursoGradoDTO[]>(this.apiUrl, { withCredentials: true });
  }

  crearAsignacion(cursoGrado: CursoGradoDTO): Observable<CursoGradoDTO> {
    return this.http.post<CursoGradoDTO>(this.apiUrl, cursoGrado, { withCredentials: true });
  }

  actualizarAsignacion(id: number, cursoGrado: CursoGradoDTO): Observable<CursoGradoDTO> {
    return this.http.put<CursoGradoDTO>(`${this.apiUrl}/${id}`, cursoGrado, {
      withCredentials: true,
    });
  }

  eliminarAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:8080/api/cursos', { withCredentials: true });
  }

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>('http://localhost:8080/api/niveles', { withCredentials: true });
  }

  obtenerGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>('http://localhost:8080/api/grados', { withCredentials: true });
  }
}
