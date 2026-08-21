
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { UsuarioService } from '../../services/usuario.service';
import { Alumno } from '../../models/alumno.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css',
})
export class Alumnos implements OnInit {
  alumnos: Alumno[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  usuariosDisponibles: Usuario[] = [];

  alumnoForm: Alumno = this.inicializarAlumnoVacio();

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  inicializarAlumnoVacio(): Alumno {
    return {
      idAlumno: 0,
      usuario: {
        idUsuario: 0,
        username: '',
        password: '',
        estado: true,
        rol: { idRol: 3, nombre: 'ALUMNO' },
      },
      dni: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      direccion: '',
      fechaNacimiento: '',
      sexo: 'M',
    };
  }

  cargarAlumnos(): void {
    this.cargando = true;
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener alumnos:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarUsuariosDisponibles(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (todosLosUsuarios) => {
        // 1. Filtramos solo los que tengan rol ALUMNO (idRol = 3)
        const usuariosAlumnos = todosLosUsuarios.filter((u) => u.rol.idRol === 3);

        // 2. Filtramos los que YA NO estén asignados a un alumno
        const idsAlumnosAsignados = this.alumnos.map((a) => a.usuario.idUsuario);

        this.usuariosDisponibles = usuariosAlumnos.filter(
          (u) => !idsAlumnosAsignados.includes(u.idUsuario),
        );

        if (this.usuariosDisponibles.length === 0) {
          alert('No hay usuarios con rol ALUMNO disponibles para asignar.');
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
    this.alumnoForm = this.inicializarAlumnoVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
    this.cargarUsuariosDisponibles();
  }

  abrirVer(alumno: Alumno): void {
    if (!alumno.idAlumno) return;
    this.alumnoService.obtenerAlumnoPorId(alumno.idAlumno).subscribe({
      next: (data) => {
        this.alumnoForm = data;
        this.editando = false;
        this.modoVer = true;
        this.mostrarFormulario = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle:', err);
        alert('No se pudo obtener el detalle del alumno');
      },
    });
  }

  abrirEditar(alumno: Alumno): void {
    this.alumnoForm = JSON.parse(JSON.stringify(alumno));
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarAlumno(): void {

    if (!this.alumnoForm.nombres.trim() || !this.alumnoForm.apellidos.trim()) {
      alert('Ingrese nombres y apellidos del alumno');
      return;
    }
    if (!this.alumnoForm.dni.trim()) {
      alert('Ingrese el DNI del alumno');
      return;
    }
    if (!this.alumnoForm.usuario || !this.alumnoForm.usuario.idUsuario) {
      alert('Debe seleccionar un usuario de la lista');
      return;
    }


    if (!this.editando) {
      const nuevoAlumno: any = {
        idAlumno: null,
        dni: this.alumnoForm.dni,
        nombres: this.alumnoForm.nombres,
        apellidos: this.alumnoForm.apellidos,
        correo: this.alumnoForm.correo,
        telefono: this.alumnoForm.telefono,
        direccion: this.alumnoForm.direccion,
        fechaNacimiento: this.alumnoForm.fechaNacimiento,
        sexo: this.alumnoForm.sexo,
        usuario: {
          idUsuario: this.alumnoForm.usuario.idUsuario,
        },
      };

      console.log('📤 Enviando nuevo alumno:', nuevoAlumno);

      this.alumnoService.crearAlumno(nuevoAlumno).subscribe({
        next: (data) => {
          console.log('✅ Alumno creado:', data);
          alert('Alumno creado correctamente');
          this.mostrarFormulario = false;
          this.cargarAlumnos();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el alumno');
        },
      });
      return;
    }

    if (this.alumnoForm.idAlumno) {
      console.log('📤 Enviando actualización:', this.alumnoForm);
      this.alumnoService.actualizarAlumno(this.alumnoForm.idAlumno, this.alumnoForm).subscribe({
        next: (data) => {
          console.log('✅ Alumno actualizado:', data);
          alert('Alumno actualizado correctamente');
          this.mostrarFormulario = false;
          this.cargarAlumnos();
        },
        error: (err) => {
          console.error('Error al editar:', err);
          alert(err.error?.message || 'No se pudo actualizar el alumno');
        },
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.alumnoForm = this.inicializarAlumnoVacio();
    this.usuariosDisponibles = [];
  }

  getEstadoInfo(estado: boolean): { texto: string; clase: string } {
    return estado
      ? { texto: 'Activo', clase: 'bg-success' }
      : { texto: 'Inactivo', clase: 'bg-danger' };
  }
}
