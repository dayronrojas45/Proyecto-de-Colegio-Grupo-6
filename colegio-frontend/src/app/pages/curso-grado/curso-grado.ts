import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../models/curso.model';
import { Nivel } from '../../models/nivel.model';
import { Grado } from '../../models/grado.model';
import { CursoGradoService } from '../../services/curso-grado.service';
import { CursoGradoDTO } from '../../models/curso-grado.model';

@Component({
  selector: 'app-curso-grado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curso-grado.html',
  styleUrl: './curso-grado.css',
})
export class CursoGrado implements OnInit {
  asignaciones: CursoGradoDTO[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  cursos: Curso[] = [];
  niveles: Nivel[] = [];
  grados: Grado[] = [];

  cursoGradoForm: CursoGradoDTO = this.inicializarFormVacio();

  constructor(
    private cursoGradoService: CursoGradoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarAsignaciones();
    this.cargarCatalogos();
  }

  inicializarFormVacio(): CursoGradoDTO {
    return {
      idCursoGrado: 0,
      idCurso: 0,
      nombreCurso: '',
      idNivel: 0,
      nombreNivel: '',
      idGrado: 0,
      nombreGrado: '',
      horasSemanales: 0,
    };
  }

  cargarAsignaciones(): void {
    this.cargando = true;
    this.cursoGradoService.obtenerAsignaciones().subscribe({
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
    this.cursoGradoService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener cursos:', err),
    });

    this.cursoGradoService.obtenerNiveles().subscribe({
      next: (data) => {
        this.niveles = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener niveles:', err),
    });

    this.cursoGradoService.obtenerGrados().subscribe({
      next: (data) => {
        this.grados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener grados:', err),
    });
  }

  abrirCrear(): void {
    this.cursoGradoForm = this.inicializarFormVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(asignacion: CursoGradoDTO): void {
    this.cursoGradoForm = {
      idCursoGrado: asignacion.idCursoGrado,
      idCurso: asignacion.idCurso,
      nombreCurso: asignacion.nombreCurso,
      idNivel: asignacion.idNivel,
      nombreNivel: asignacion.nombreNivel,
      idGrado: asignacion.idGrado,
      nombreGrado: asignacion.nombreGrado,
      horasSemanales: asignacion.horasSemanales,
    };

    this.editando = false;
    this.modoVer = true;
    this.mostrarFormulario = true;
  }

  abrirEditar(asignacion: CursoGradoDTO): void {
    this.cursoGradoForm = {
      idCursoGrado: asignacion.idCursoGrado,
      idCurso: asignacion.idCurso,
      nombreCurso: asignacion.nombreCurso,
      idNivel: asignacion.idNivel,
      nombreNivel: asignacion.nombreNivel,
      idGrado: asignacion.idGrado,
      nombreGrado: asignacion.nombreGrado,
      horasSemanales: asignacion.horasSemanales,
    };

    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarAsignacion(): void {
    if (!this.cursoGradoForm.idCurso) {
      alert('Seleccione un curso');
      return;
    }
    if (!this.cursoGradoForm.idNivel) {
      alert('Seleccione un nivel');
      return;
    }
    if (!this.cursoGradoForm.idGrado) {
      alert('Seleccione un grado');
      return;
    }
    if (!this.cursoGradoForm.horasSemanales) {
      alert('Ingrese las horas semanales');
      return;
    }

    if (!this.editando) {
      const nuevaAsignacion: any = {
        idCursoGrado: null,
        idCurso: this.cursoGradoForm.idCurso,
        idNivel: this.cursoGradoForm.idNivel,
        idGrado: this.cursoGradoForm.idGrado,
        horasSemanales: this.cursoGradoForm.horasSemanales,
      };

      console.log('Enviando nueva asignación:', nuevaAsignacion);

      this.cursoGradoService.crearAsignacion(nuevaAsignacion).subscribe({
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

    if (this.editando && this.cursoGradoForm.idCursoGrado) {
      const datosActualizacion: any = {
        idCursoGrado: this.cursoGradoForm.idCursoGrado,
        idCurso: this.cursoGradoForm.idCurso,
        idNivel: this.cursoGradoForm.idNivel,
        idGrado: this.cursoGradoForm.idGrado,
        horasSemanales: this.cursoGradoForm.horasSemanales,
      };

      console.log('Enviando actualización:', datosActualizacion);

      this.cursoGradoService
        .actualizarAsignacion(this.cursoGradoForm.idCursoGrado, datosActualizacion)
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

    this.cursoGradoService.eliminarAsignacion(id).subscribe({
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
    this.cursoGradoForm = this.inicializarFormVacio();
  }
}
