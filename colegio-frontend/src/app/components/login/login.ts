import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  cargando: boolean = false;

  onSubmit(): void {
    this.errorMessage = '';
    this.cargando = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.cargando = false;
        console.log(' Login exitoso, redirigiendo a welcome...', response);
        // Navegamos a la página de bienvenida
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        this.cargando = false;
        console.error(' Error en el login:', err);
        this.errorMessage = err.error?.mensaje || 'Usuario o contraseña incorrectos';
      },
    });
  }
}
