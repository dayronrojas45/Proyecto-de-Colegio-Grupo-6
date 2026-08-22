// inicio-admin.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- IMPORTANTE
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- AGREGAR RouterModule
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css',
})
export class InicioAdmin {
  private auth = inject(Auth);

  get nombre() {
    return this.auth.getNombreUsuario();
  }

  get rol() {
    return this.auth.getRol() || '';
  }
}
