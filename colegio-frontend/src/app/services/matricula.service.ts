import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatriculaDTO } from '../models/matricula.model';
import { Alumno } from '../models/alumno.model';
import { Aula } from '../models/aula.model';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/matriculas';

  obtenerMatriculas(): Observable<MatriculaDTO[]> {
    return this.http.get<MatriculaDTO[]>(this.apiUrl, { withCredentials: true });
  }

  crearMatricula(matricula: MatriculaDTO): Observable<MatriculaDTO> {
    return this.http.post<MatriculaDTO>(`${this.apiUrl}/registrar`, matricula, {
      withCredentials: true,
    });
  }

  actualizarMatricula(id: number, matricula: MatriculaDTO): Observable<MatriculaDTO> {
    return this.http.put<MatriculaDTO>(`${this.apiUrl}/${id}`, matricula, {
      withCredentials: true,
    });
  }

  eliminarMatricula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>('http://localhost:8080/api/alumnos', { withCredentials: true });
  }

  obtenerAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>('http://localhost:8080/api/aulas', { withCredentials: true });
  }
}
