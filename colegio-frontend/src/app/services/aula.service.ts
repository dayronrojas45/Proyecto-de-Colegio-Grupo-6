
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aula } from '../models/aula.model';
import { Nivel } from '../models/nivel.model';
import { Grado } from '../models/grado.model';
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/aulas';

  // Aulas
  obtenerAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerAulaPorId(id: number): Observable<Aula> {
    return this.http.get<Aula>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  crearAula(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(`${this.apiUrl}/registro`, aula, { withCredentials: true });
  }

  actualizarAula(id: number, aula: Aula): Observable<Aula> {
    return this.http.put<Aula>(`${this.apiUrl}/${id}`, aula, { withCredentials: true });
  }

  eliminarAula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>('http://localhost:8080/api/niveles', { withCredentials: true });
  }

  obtenerGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>('http://localhost:8080/api/grados', { withCredentials: true });
  }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>('http://localhost:8080/api/profesores', {
      withCredentials: true,
    });
  }
}
