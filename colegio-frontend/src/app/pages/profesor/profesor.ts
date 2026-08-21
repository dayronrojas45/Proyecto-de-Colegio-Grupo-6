
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { UsuarioService } from '../../services/usuario.service'; // 👈 Importa el servicio de Usuario
import { Profesor } from '../../models/profesor.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesor.html',
  styleUrl: './profesor.css',
})
export class Profesores implements OnInit {
  profesores: Profesor[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  usuariosDisponibles: Usuario[] = [];

  profesorForm: Profesor = this.inicializarProfesorVacio();

  constructor(
    private profesorService: ProfesorService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarProfesores();
  }

  inicializarProfesorVacio(): Profesor {
    return {
      idProfesor: 0,
      usuario: {
        idUsuario: 0,
        username: '',
        password: '',
        estado: true,
        rol: { idRol: 2, nombre: 'PROFESOR' },
      },
      dni: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      especialidad: '',
    };
  }

  cargarProfesores(): void {
    this.cargando = true;
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener profesores:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarUsuariosDisponibles(): void {
    // Obtenemos TODOS los usuarios
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (todosLosUsuarios) => {

        const usuariosProfesores = todosLosUsuarios.filter((u) => u.rol.idRol === 2);

        const idsProfesoresAsignados = this.profesores.map((p) => p.usuario.idUsuario);

        this.usuariosDisponibles = usuariosProfesores.filter(
          (u) => !idsProfesoresAsignados.includes(u.idUsuario),
        );

        if (this.usuariosDisponibles.length === 0) {
          alert(
            'No hay usuarios con rol PROFESOR disponibles para asignar. Primero crea un usuario con ese rol.',
          );
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('No se pudo cargar la lista de usuarios');
      },
    });
  }

  abrirCrear(): void {
    this.profesorForm = this.inicializarProfesorVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;

    this.cargarUsuariosDisponibles();
  }

  abrirVer(profesor: Profesor): void {
    if (!profesor.idProfesor) return;
    this.profesorService.obtenerProfesorPorId(profesor.idProfesor).subscribe({
      next: (data) => {
        this.profesorForm = data;
        this.editando = false;
        this.modoVer = true;
        this.mostrarFormulario = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle:', err);
        alert('No se pudo obtener el detalle del profesor');
      },
    });
  }

  abrirEditar(profesor: Profesor): void {
    this.profesorForm = JSON.parse(JSON.stringify(profesor));
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarProfesor(): void {
    // Validaciones
    if (!this.profesorForm.nombres.trim() || !this.profesorForm.apellidos.trim()) {
      alert('Ingrese nombres y apellidos del profesor');
      return;
    }
    if (!this.profesorForm.dni.trim()) {
      alert('Ingrese el DNI del profesor');
      return;
    }
    // Validamos que haya seleccionado un usuario
    if (!this.profesorForm.usuario || !this.profesorForm.usuario.idUsuario) {
      alert('Debe seleccionar un usuario de la lista');
      return;
    }

    if (!this.editando) {

      const nuevoProfesor: any = {
        idProfesor: null,
        dni: this.profesorForm.dni,
        nombres: this.profesorForm.nombres,
        apellidos: this.profesorForm.apellidos,
        correo: this.profesorForm.correo,
        telefono: this.profesorForm.telefono,
        especialidad: this.profesorForm.especialidad,
        usuario: {
          idUsuario: this.profesorForm.usuario.idUsuario,
        },
      };

      console.log('📤 Enviando nuevo profesor (usuario seleccionado):', nuevoProfesor);

      this.profesorService.crearProfesor(nuevoProfesor).subscribe({
        next: (data) => {
          console.log('✅ Profesor creado:', data);
          alert('Profesor creado correctamente');
          this.mostrarFormulario = false;
          this.cargarProfesores();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el profesor');
        },
      });
      return;
    }

    if (this.profesorForm.idProfesor) {
      console.log('📤 Enviando actualización:', this.profesorForm);
      this.profesorService
        .actualizarProfesor(this.profesorForm.idProfesor, this.profesorForm)
        .subscribe({
          next: (data) => {
            console.log('Profesor actualizado:', data);
            alert('Profesor actualizado correctamente');
            this.mostrarFormulario = false;
            this.cargarProfesores();
          },
          error: (err) => {
            console.error('Error al editar:', err);
            alert(err.error?.message || 'No se pudo actualizar el profesor');
          },
        });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.profesorForm = this.inicializarProfesorVacio();
    this.usuariosDisponibles = [];
  }

  getEstadoInfo(estado: boolean): { texto: string; clase: string } {
    return estado
      ? { texto: 'Activo', clase: 'bg-success' }
      : { texto: 'Inactivo', clase: 'bg-danger' };
  }
}
