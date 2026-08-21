
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];

  cargando: boolean = true;

  mostrarFormulario: boolean = false;

  editando: boolean = false;

  modoVer: boolean = false;

  usuarioForm: Usuario = this.inicializarUsuarioVacio();

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }
  inicializarUsuarioVacio(): Usuario {
    return {
      idUsuario: 0,
      username: '',
      password: '',
      estado: true,
      rol: {
        idRol: 1,
        nombre: 'ADMINISTRADOR',
      },
    };
  }
  cargarUsuarios(): void {
    this.cargando = true;

    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('✅ Usuarios cargados:', data);
      },

      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
  abrirCrear(): void {
    this.usuarioForm = this.inicializarUsuarioVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }
  abrirVer(usuario: Usuario): void {
    if (!usuario.idUsuario) {
      return;
    }

    this.usuarioService.obtenerUsuarioPorId(usuario.idUsuario).subscribe({
      next: (data) => {
        this.usuarioForm = data;
        this.editando = false;
        this.modoVer = true;
        this.mostrarFormulario = true;
      },

      error: (err) => {
        console.error('Error al obtener detalle:', err);
        alert('No se pudo obtener el detalle del usuario');
      },
    });
  }

  abrirEditar(usuario: Usuario): void {
    this.usuarioForm = JSON.parse(JSON.stringify(usuario));
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }
  guardarUsuario(): void {
    if (!this.usuarioForm.username.trim()) {
      alert('Ingrese el nombre de usuario');
      return;
    }

    if (!this.usuarioForm.rol.idRol) {
      alert('Seleccione un rol');
      return;
    }
    if (!this.editando) {
      const nuevoUsuario: Usuario = {
        idUsuario: 0,
        username: this.usuarioForm.username,
        password: '123456',
        estado: this.usuarioForm.estado,
        rol: {
          idRol: this.usuarioForm.rol.idRol,
          nombre: '',
        },
      };

      console.log('📤 Enviando nuevo usuario:', nuevoUsuario);

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: (data) => {
          console.log('✅ Usuario creado:', data);
          alert('Usuario creado correctamente');
          this.mostrarFormulario = false;
          this.cargarUsuarios();
        },

        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el usuario');
        },
      });

      return;
    }
    if (this.usuarioForm.idUsuario) {
      const datosActualizacion: Usuario = {
        idUsuario: this.usuarioForm.idUsuario,
        username: this.usuarioForm.username,
        password: this.usuarioForm.password || '',
        estado: this.usuarioForm.estado,
        rol: {
          idRol: this.usuarioForm.rol.idRol,
          nombre: '',
        },
      };

      console.log('📤 Enviando actualización:', datosActualizacion);

      this.usuarioService
        .actualizarUsuario(this.usuarioForm.idUsuario, datosActualizacion)
        .subscribe({
          next: (data) => {
            console.log('✅ Usuario actualizado:', data);
            alert('Usuario actualizado correctamente');
            this.mostrarFormulario = false;
            this.cargarUsuarios();
          },

          error: (err) => {
            console.error('Error al editar:', err);
            alert(err.error?.message || 'No se pudo actualizar el usuario');
          },
        });
    }
  }

  eliminarUsuario(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este usuario?');

    if (!confirmar) {
      return;
    }

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        this.cargarUsuarios();
      },

      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar el usuario');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.usuarioForm = this.inicializarUsuarioVacio();
  }

  getEstadoInfo(estado: boolean): { texto: string; clase: string } {
    return estado
      ? {
          texto: 'Activo',
          clase: 'bg-success',
        }
      : {
          texto: 'Inactivo',
          clase: 'bg-danger',
        };
  }

  getRolClass(rolNombre: string): string {
    const clases: {
      [key: string]: string;
    } = {
      ADMINISTRADOR: 'bg-primary',
      PROFESOR: 'bg-warning text-dark',
      ALUMNO: 'bg-info',
    };

    return clases[rolNombre] || 'bg-secondary';
  }
}
