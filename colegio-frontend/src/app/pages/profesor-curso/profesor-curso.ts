import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorCursoService } from '../../services/profesor-curso.service';
import { ProfesorCursoDTO } from '../../models/profesor-curso.model';
import { Profesor } from '../../models/profesor.model';
import { CursoGradoDTO } from '../../models/curso-grado.model';

@Component({
  selector: 'app-profesor-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesor-curso.html',
  styleUrl: './profesor-curso.css',
})
export class ProfesorCurso implements OnInit {
  asignaciones: ProfesorCursoDTO[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  profesores: Profesor[] = [];
  cursosGrados: CursoGradoDTO[] = [];

  profesorCursoForm: ProfesorCursoDTO = this.inicializarFormVacio();

  constructor(
    private profesorCursoService: ProfesorCursoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
    this.cargarCatalogos();
  }

  inicializarFormVacio(): ProfesorCursoDTO {
    return {
      idProfesorCurso: 0,
      idProfesor: 0,
      nombresProfesor: '',
      apellidosProfesor: '',
      idCursoGrado: 0,
      nombreCurso: '',
      nombreNivel: '',
      nombreGrado: '',
    };
  }

  cargarAsignaciones(): void {
    this.cargando = true;
    this.profesorCursoService.obtenerAsignaciones().subscribe({
      next: (data) => {
        this.asignaciones = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener asignaciones:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarCatalogos(): void {
    this.profesorCursoService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener profesores:', err),
    });

    this.profesorCursoService.obtenerCursoGrados().subscribe({
      next: (data) => {
        this.cursosGrados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener cursos-grados:', err),
    });
  }

  abrirCrear(): void {
    this.profesorCursoForm = this.inicializarFormVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(asignacion: ProfesorCursoDTO): void {
    this.profesorCursoForm = {
      idProfesorCurso: asignacion.idProfesorCurso,
      idProfesor: asignacion.idProfesor,
      nombresProfesor: asignacion.nombresProfesor,
      apellidosProfesor: asignacion.apellidosProfesor,
      idCursoGrado: asignacion.idCursoGrado,
      nombreCurso: asignacion.nombreCurso,
      nombreNivel: asignacion.nombreNivel,
      nombreGrado: asignacion.nombreGrado,
    };

    this.editando = false;
    this.modoVer = true;
    this.mostrarFormulario = true;
  }

  abrirEditar(asignacion: ProfesorCursoDTO): void {
    this.profesorCursoForm = {
      idProfesorCurso: asignacion.idProfesorCurso,
      idProfesor: asignacion.idProfesor,
      nombresProfesor: asignacion.nombresProfesor,
      apellidosProfesor: asignacion.apellidosProfesor,
      idCursoGrado: asignacion.idCursoGrado,
      nombreCurso: asignacion.nombreCurso,
      nombreNivel: asignacion.nombreNivel,
      nombreGrado: asignacion.nombreGrado,
    };

    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarAsignacion(): void {
    if (!this.profesorCursoForm.idProfesor) {
      alert('Seleccione un profesor');
      return;
    }
    if (!this.profesorCursoForm.idCursoGrado) {
      alert('Seleccione un curso-grado');
      return;
    }

    if (!this.editando) {
      const nuevaAsignacion: any = {
        idProfesorCurso: null,
        idProfesor: this.profesorCursoForm.idProfesor,
        idCursoGrado: this.profesorCursoForm.idCursoGrado,
      };

      console.log('Enviando nueva asignación:', nuevaAsignacion);

      this.profesorCursoService.crearAsignacion(nuevaAsignacion).subscribe({
        next: (data) => {
          alert('Asignación creada correctamente');
          this.mostrarFormulario = false;
          this.cargarAsignaciones();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear la asignación');
        },
      });
      return;
    }

    if (this.editando && this.profesorCursoForm.idProfesorCurso) {
      const datosActualizacion: any = {
        idProfesorCurso: this.profesorCursoForm.idProfesorCurso,
        idProfesor: this.profesorCursoForm.idProfesor,
        idCursoGrado: this.profesorCursoForm.idCursoGrado,
      };

      console.log('Enviando actualización:', datosActualizacion);

      this.profesorCursoService
        .actualizarAsignacion(this.profesorCursoForm.idProfesorCurso, datosActualizacion)
        .subscribe({
          next: (data) => {
            alert('Asignación actualizada correctamente');
            this.mostrarFormulario = false;
            this.cargarAsignaciones();
          },
          error: (err) => {
            console.error('Error al editar:', err);
            alert(err.error?.message || 'No se pudo actualizar la asignación');
          },
        });
    }
  }

  eliminarAsignacion(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar esta asignación?');
    if (!confirmar) return;

    this.profesorCursoService.eliminarAsignacion(id).subscribe({
      next: () => {
        alert('Asignación eliminada correctamente');
        this.cargarAsignaciones();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar la asignación');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.profesorCursoForm = this.inicializarFormVacio();
  }
}
