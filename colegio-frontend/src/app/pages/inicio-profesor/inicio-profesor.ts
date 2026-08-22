// inicio-profesor.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- IMPORTANTE
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-inicio-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- AGREGAR RouterModule
  templateUrl: './inicio-profesor.html',
  styleUrl: './inicio-profesor.css',
})
export class InicioProfesor {
  private auth = inject(Auth);

  get nombre() {
    return this.auth.getNombreUsuario();
  }

  get rol() {
    return this.auth.getRol() || '';
  }
}
