// inicio-alumno.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- IMPORTANTE
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-inicio-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- AGREGAR RouterModule
  templateUrl: './inicio-alumno.html',
  styleUrl: './inicio-alumno.css',
})
export class InicioAlumno {
  private auth = inject(Auth);

  get nombre() {
    return this.auth.getNombreUsuario();
  }

  get rol() {
    return this.auth.getRol() || '';
  }
}
