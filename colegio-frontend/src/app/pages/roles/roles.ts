import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles implements OnInit {
  roles: Rol[] = [];

  cargando: boolean = true;

  mostrarFormulario: boolean = false;

  editando: boolean = false;

  modoVer: boolean = false;

  rolForm: Rol = this.inicializarRolVacio();

  constructor(
    private rolService: RolService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  inicializarRolVacio(): Rol {
    return {
      idRol: 0,
      nombre: '',
    };
  }

  cargarRoles(): void {
    this.cargando = true;

    this.rolService.obtenerRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('✅ Roles cargados:', data);
      },

      error: (err) => {
        console.error('Error al obtener roles:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  abrirCrear(): void {
    this.rolForm = this.inicializarRolVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(rol: Rol): void {
    if (!rol.idRol) {
      return;
    }

    this.rolService.obtenerRolPorId(rol.idRol).subscribe({
      next: (data) => {
        this.rolForm = data;
        this.editando = false;
        this.modoVer = true;

        setTimeout(() => {
          this.mostrarFormulario = true;
        }, 0);
      },

      error: (err) => {
        console.error('Error al obtener detalle:', err);
        alert('No se pudo obtener el detalle del rol');
      },
    });
  }

  abrirEditar(rol: Rol): void {
    this.rolForm = JSON.parse(JSON.stringify(rol));
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarRol(): void {

    if (!this.rolForm.nombre.trim()) {
      alert('Ingrese el nombre del rol');
      return;
    }

    if (!this.editando) {
      const nuevoRol: Rol = {
        idRol: 0,
        nombre: this.rolForm.nombre,
      };

      console.log('📤 Enviando nuevo rol:', nuevoRol);

      this.rolService.crearRol(nuevoRol).subscribe({
        next: (data) => {
          console.log('✅ Rol creado:', data);
          alert('Rol creado correctamente');
          this.mostrarFormulario = false;
          this.cargarRoles();
        },

        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el rol');
        },
      });

      return;
    }

    if (this.rolForm.idRol) {
      const datosActualizacion: Rol = {
        idRol: this.rolForm.idRol,
        nombre: this.rolForm.nombre,
      };

      console.log('📤 Enviando actualización:', datosActualizacion);

      this.rolService.actualizarRol(this.rolForm.idRol, datosActualizacion).subscribe({
        next: (data) => {
          console.log('Rol actualizado:', data);
          alert('Rol actualizado correctamente');
          this.mostrarFormulario = false;
          this.cargarRoles();
        },

        error: (err) => {
          console.error('Error al editar:', err);
          alert(err.error?.message || 'No se pudo actualizar el rol');
        },
      });
    }
  }

  eliminarRol(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este rol?');

    if (!confirmar) {
      return;
    }

    this.rolService.eliminarRol(id).subscribe({
      next: () => {
        alert('Rol eliminado correctamente');
        this.cargarRoles();
      },

      error: (err) => {
        console.error(' Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar el rol');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.rolForm = this.inicializarRolVacio();
  }
}
