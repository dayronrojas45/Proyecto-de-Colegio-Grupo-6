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
  styleUrl: './login.css'
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
        console.log('Login exitoso:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMessage = err.error?.mensaje || 'Usuario o contraseña incorrectos';
      }
    });
  }
}
