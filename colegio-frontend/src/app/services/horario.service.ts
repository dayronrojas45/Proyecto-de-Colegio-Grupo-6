import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioDTO, CrearHorarioRequestDTO } from '../models/horario.model';
import { ProfesorCursoDTO } from '../models/profesor-curso.model';
import { Aula } from '../models/aula.model';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/horarios';

  obtenerHorarios(): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>(this.apiUrl, { withCredentials: true });
  }

  crearHorario(horario: CrearHorarioRequestDTO): Observable<HorarioDTO> {
    return this.http.post<HorarioDTO>(this.apiUrl, horario, { withCredentials: true });
  }

  actualizarHorario(id: number, horario: CrearHorarioRequestDTO): Observable<HorarioDTO> {
    return this.http.put<HorarioDTO>(`${this.apiUrl}/${id}`, horario, { withCredentials: true });
  }

  eliminarHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerProfesoresCursos(): Observable<ProfesorCursoDTO[]> {
    return this.http.get<ProfesorCursoDTO[]>('http://localhost:8080/api/profesores-cursos', {
      withCredentials: true,
    });
  }

  obtenerAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>('http://localhost:8080/api/aulas', { withCredentials: true });
  }
}
