
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private http = inject(HttpClient);
  // Usamos la URL de tu RolController.java
  private apiUrl = 'http://localhost:8080/api/roles';

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerRolPorId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  crearRol(rol: Rol): Observable<Rol> {
    const rolParaEnviar = {
      idRol: null,
      nombre: rol.nombre,
    };
    return this.http.post<Rol>(this.apiUrl, rolParaEnviar, { withCredentials: true });
  }

  actualizarRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol, { withCredentials: true });
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
