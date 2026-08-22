import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalificacionService } from '../../services/calificacion.service';
import { CalificacionDTO } from '../../models/calificacion.model';
import { Alumno } from '../../models/alumno.model';
import { ProfesorCursoDTO } from '../../models/profesor-curso.model';

@Component({
  selector: 'app-calificacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calificacion.html',
  styleUrl: './calificacion.css',
})
export class Calificacion implements OnInit {
  calificaciones: CalificacionDTO[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  alumnos: Alumno[] = [];
  profesoresCursos: ProfesorCursoDTO[] = [];

  calificacionForm: CalificacionDTO = this.inicializarFormVacio();

  constructor(
    private calificacionService: CalificacionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarCalificaciones();
    this.cargarCatalogos();
  }

  inicializarFormVacio(): CalificacionDTO {
    return {
      idCalificacion: 0,
      alumno: {
        idAlumno: 0,
        usuario: { idUsuario: 0, username: '', estado: true, rol: { idRol: 3, nombre: 'ALUMNO' } },
        dni: '',
        nombres: '',
        apellidos: '',
      },
      profesorCurso: {
        idProfesorCurso: 0,
        idProfesor: 0,
        nombresProfesor: '',
        apellidosProfesor: '',
        idCursoGrado: 0,
        nombreCurso: '',
        nombreNivel: '',
        nombreGrado: '',
      },
      bimestre: 1,
      pc1: 0,
      pc2: 0,
      examenFinal: 0,
      promedio: 0,
    };
  }

  cargarCalificaciones(): void {
    this.cargando = true;
    this.calificacionService.obtenerCalificaciones().subscribe({
      next: (data) => {
        this.calificaciones = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener calificaciones:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarCatalogos(): void {
    this.calificacionService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener alumnos:', err),
    });

    this.calificacionService.obtenerProfesoresCursos().subscribe({
      next: (data) => {
        this.profesoresCursos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener profesores-cursos:', err),
    });
  }

  abrirCrear(): void {
    this.calificacionForm = this.inicializarFormVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(calificacion: CalificacionDTO): void {
    this.calificacionForm = {
      idCalificacion: calificacion.idCalificacion,
      alumno: {
        idAlumno: calificacion.alumno.idAlumno,
        usuario: { idUsuario: 0, username: '', estado: true, rol: { idRol: 3, nombre: 'ALUMNO' } },
        dni: '',
        nombres: '',
        apellidos: '',
      },
      profesorCurso: {
        idProfesorCurso: calificacion.profesorCurso.idProfesorCurso,
        idProfesor: calificacion.profesorCurso.idProfesor,
        nombresProfesor: calificacion.profesorCurso.nombresProfesor,
        apellidosProfesor: calificacion.profesorCurso.apellidosProfesor,
        idCursoGrado: calificacion.profesorCurso.idCursoGrado,
        nombreCurso: calificacion.profesorCurso.nombreCurso,
        nombreNivel: calificacion.profesorCurso.nombreNivel,
        nombreGrado: calificacion.profesorCurso.nombreGrado,
      },
      bimestre: calificacion.bimestre,
      pc1: calificacion.pc1,
      pc2: calificacion.pc2,
      examenFinal: calificacion.examenFinal,
      promedio: calificacion.promedio,
    };

    this.editando = false;
    this.modoVer = true;
    this.mostrarFormulario = true;
  }

  abrirEditar(calificacion: CalificacionDTO): void {
    this.calificacionForm = {
      idCalificacion: calificacion.idCalificacion,
      alumno: {
        idAlumno: calificacion.alumno.idAlumno,
        usuario: { idUsuario: 0, username: '', estado: true, rol: { idRol: 3, nombre: 'ALUMNO' } },
        dni: '',
        nombres: '',
        apellidos: '',
      },
      profesorCurso: {
        idProfesorCurso: calificacion.profesorCurso.idProfesorCurso,
        idProfesor: calificacion.profesorCurso.idProfesor,
        nombresProfesor: calificacion.profesorCurso.nombresProfesor,
        apellidosProfesor: calificacion.profesorCurso.apellidosProfesor,
        idCursoGrado: calificacion.profesorCurso.idCursoGrado,
        nombreCurso: calificacion.profesorCurso.nombreCurso,
        nombreNivel: calificacion.profesorCurso.nombreNivel,
        nombreGrado: calificacion.profesorCurso.nombreGrado,
      },
      bimestre: calificacion.bimestre,
      pc1: calificacion.pc1,
      pc2: calificacion.pc2,
      examenFinal: calificacion.examenFinal,
      promedio: calificacion.promedio,
    };

    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarCalificacion(): void {
    if (!this.calificacionForm.alumno.idAlumno) {
      alert('Seleccione un alumno');
      return;
    }
    if (!this.calificacionForm.profesorCurso.idProfesorCurso) {
      alert('Seleccione un profesor-curso');
      return;
    }
    if (!this.calificacionForm.bimestre) {
      alert('Seleccione un bimestre');
      return;
    }

    this.prepararParaGuardar();

    if (!this.editando) {
      const nuevaCalificacion: any = {
        idCalificacion: null,
        alumno: { idAlumno: this.calificacionForm.alumno.idAlumno },
        profesorCurso: { idProfesorCurso: this.calificacionForm.profesorCurso.idProfesorCurso },
        bimestre: this.calificacionForm.bimestre,
        pc1: this.calificacionForm.pc1,
        pc2: this.calificacionForm.pc2,
        examenFinal: this.calificacionForm.examenFinal,
        promedio: this.calificacionForm.promedio,
      };

      console.log('Enviando nueva calificación:', nuevaCalificacion);

      this.calificacionService.crearCalificacion(nuevaCalificacion).subscribe({
        next: (data) => {
          alert('Calificación creada correctamente');
          this.mostrarFormulario = false;
          this.cargarCalificaciones();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear la calificación');
        },
      });
      return;
    }

    if (this.editando && this.calificacionForm.idCalificacion) {
      const datosActualizacion: any = {
        idCalificacion: this.calificacionForm.idCalificacion,
        alumno: { idAlumno: this.calificacionForm.alumno.idAlumno },
        profesorCurso: { idProfesorCurso: this.calificacionForm.profesorCurso.idProfesorCurso },
        bimestre: this.calificacionForm.bimestre,
        pc1: this.calificacionForm.pc1,
        pc2: this.calificacionForm.pc2,
        examenFinal: this.calificacionForm.examenFinal,
        promedio: this.calificacionForm.promedio,
      };

      console.log('Enviando actualización:', datosActualizacion);

      this.calificacionService
        .actualizarCalificacion(this.calificacionForm.idCalificacion, datosActualizacion)
        .subscribe({
          next: (data) => {
            alert('Calificación actualizada correctamente');
            this.mostrarFormulario = false;
            this.cargarCalificaciones();
          },
          error: (err) => {
            console.error('Error al editar:', err);
            alert(err.error?.message || 'No se pudo actualizar la calificación');
          },
        });
    }
  }

  eliminarCalificacion(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar esta calificación?');
    if (!confirmar) return;

    this.calificacionService.eliminarCalificacion(id).subscribe({
      next: () => {
        alert('Calificación eliminada correctamente');
        this.cargarCalificaciones();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar la calificación');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.calificacionForm = this.inicializarFormVacio();
  }
  calcularPromedio(): void {
    const pc1 = this.calificacionForm.pc1 || 0;
    const pc2 = this.calificacionForm.pc2 || 0;
    const examen = this.calificacionForm.examenFinal || 0;
    const promedio = (pc1 + pc2 + examen) / 3;

    this.calificacionForm.promedio = Math.round(promedio * 100) / 100;
  }

  onNotaChange(): void {
    this.calcularPromedio();
    this.cdr.detectChanges();
  }

  prepararParaGuardar(): void {
    this.calcularPromedio();
  }
}
