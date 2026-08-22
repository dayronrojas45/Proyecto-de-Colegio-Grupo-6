import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaDTO } from '../models/asistencia.model';
import { Aula } from '../models/aula.model';
import { Alumno } from '../models/alumno.model';
import { HorarioDTO } from '../models/horario.model';
import { MatriculaDTO } from '../models/matricula.model';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/asistencias';

  obtenerAsistencias(): Observable<AsistenciaDTO[]> {
    return this.http.get<AsistenciaDTO[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerAsistenciasPorAula(idAula: number): Observable<AsistenciaDTO[]> {
    return this.http.get<AsistenciaDTO[]>(`${this.apiUrl}/aula/${idAula}`, {
      withCredentials: true,
    });
  }

  crearAsistencia(asistencia: AsistenciaDTO): Observable<AsistenciaDTO> {
    return this.http.post<AsistenciaDTO>(this.apiUrl, asistencia, { withCredentials: true });
  }

  crearMultiplesAsistencias(asistencias: any[]): Observable<AsistenciaDTO[]> {
    return this.http.post<AsistenciaDTO[]>(`${this.apiUrl}/batch`, asistencias, {
      withCredentials: true,
    });
  }

  actualizarAsistencia(id: number, asistencia: AsistenciaDTO): Observable<AsistenciaDTO> {
    return this.http.put<AsistenciaDTO>(`${this.apiUrl}/${id}`, asistencia, {
      withCredentials: true,
    });
  }

  eliminarAsistencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>('http://localhost:8080/api/aulas', { withCredentials: true });
  }

  obtenerMatriculasPorAula(idAula: number): Observable<MatriculaDTO[]> {
    return this.http.get<MatriculaDTO[]>(`http://localhost:8080/api/matriculas/aula/${idAula}`, {
      withCredentials: true,
    });
  }

  obtenerAsistenciasPorAulaHorarioYFecha(
    idAula: number,
    idHorario: number,
    fecha: string,
  ): Observable<AsistenciaDTO[]> {
    return this.http.get<AsistenciaDTO[]>(
      `${this.apiUrl}/aula/${idAula}/horario/${idHorario}/fecha/${fecha}`,
      { withCredentials: true },
    );
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>('http://localhost:8080/api/alumnos', { withCredentials: true });
  }

  obtenerHorarios(): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>('http://localhost:8080/api/horarios', {
      withCredentials: true,
    });
  }
}
