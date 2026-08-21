import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor} from '../models/profesor.model';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/profesores';

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerUsuariosProfesoresDisponibles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`http://localhost:8080/api/usuarios`, {
      withCredentials: true,
    });
  }

  obtenerProfesorPorId(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  crearProfesor(profesor: Profesor): Observable<Profesor> {
    // Enviamos el objeto completo, el backend se encarga de crear el usuario si es necesario
    return this.http.post<Profesor>(`${this.apiUrl}/registro`, profesor, { withCredentials: true });
  }

  actualizarProfesor(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${id}`, profesor, { withCredentials: true });
  }

  eliminarProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
