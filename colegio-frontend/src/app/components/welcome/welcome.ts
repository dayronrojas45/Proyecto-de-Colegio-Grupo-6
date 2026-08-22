import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  protected readonly title = signal('colegio-frontend');

  get usuario() {
    return this.auth.getUsuario();
  }

  get rol() {
    return this.auth.getRol();
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Redirigir según el rol al inicio
    if (this.auth.isAdmin()) {
      this.router.navigate(['/welcome/inicio']);
    } else if (this.auth.isProfesor()) {
      this.router.navigate(['/welcome/inicio-profesor']);
    } else if (this.auth.isAlumno()) {
      this.router.navigate(['/welcome/inicio-alumno']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // ✅ Usa los métodos del servicio Auth (ya corregidos)
  esAdmin(): boolean {
    return this.auth.isAdmin();
  }

  esProfesor(): boolean {
    return this.auth.isProfesor();
  }

  esAlumno(): boolean {
    return this.auth.isAlumno();
  }

  getRolBadgeClass(): string {
    if (this.auth.isAdmin()) return 'bg-danger';
    if (this.auth.isProfesor()) return 'bg-success';
    if (this.auth.isAlumno()) return 'bg-info';
    return 'bg-secondary';
  }

  get currentPage() {
    const url = this.router.url.split('/')[1] || 'inicio';
    return url.charAt(0).toUpperCase() + url.slice(1);
  }
}
