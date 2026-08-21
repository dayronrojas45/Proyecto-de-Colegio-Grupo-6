
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  login(username: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { username, password };
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, body, { withCredentials: true })
      .pipe(
        tap((response) => {
          localStorage.setItem('usuario', JSON.stringify(response));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getUsuario(): LoginResponse | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.getUsuario() !== null;
  }

  getRol(): string | null {
    return this.getUsuario()?.rol ?? null;
  }
}
