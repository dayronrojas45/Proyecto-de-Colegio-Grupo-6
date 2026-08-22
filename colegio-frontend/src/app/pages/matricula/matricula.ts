import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatriculaService } from '../../services/matricula.service';
import { MatriculaDTO } from '../../models/matricula.model';
import { Alumno } from '../../models/alumno.model';
import { Aula } from '../../models/aula.model';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css',
})
export class Matricula implements OnInit {
  matriculas: MatriculaDTO[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  alumnos: Alumno[] = [];
  aulas: Aula[] = [];
  matriculaForm: MatriculaDTO = this.inicializarFormVacio();

  constructor(
    private matriculaService: MatriculaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarMatriculas();
    this.cargarCatalogos();
  }

  inicializarFormVacio(): MatriculaDTO {
    return {
      idMatricula: 0,
      alumno: {
        idAlumno: 0,
        usuario: { idUsuario: 0, username: '', estado: true, rol: { idRol: 3, nombre: 'ALUMNO' } },
        dni: '',
        nombres: '',
        apellidos: '',
      },
      aula: {
        idAula: 0,
        nivel: { idNivel: 0, nombre: '' },
        grado: { idGrado: 0, nombre: '' },
        seccion: '',
        capacidad: 30,
        tutor: {
          idProfesor: 0,
          usuario: {
            idUsuario: 0,
            username: '',
            estado: true,
            rol: { idRol: 2, nombre: 'PROFESOR' },
          },
          dni: '',
          nombres: '',
          apellidos: '',
        },
      },
      anio: '',
      fecha: '',
      estado: 'ACTIVO',
    };
  }

  cargarMatriculas(): void {
    this.cargando = true;
    this.matriculaService.obtenerMatriculas().subscribe({
      next: (data) => {
        this.matriculas = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener matrículas:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarCatalogos(): void {
    this.matriculaService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener alumnos:', err),
    });

    this.matriculaService.obtenerAulas().subscribe({
      next: (data) => {
        this.aulas = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener aulas:', err),
    });
  }

  abrirCrear(): void {
    this.matriculaForm = this.inicializarFormVacio();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(matricula: MatriculaDTO): void {
    this.matriculaForm = { ...matricula };
    this.editando = false;
    this.modoVer = true;
    this.mostrarFormulario = true;
  }

  abrirEditar(matricula: MatriculaDTO): void {
    this.matriculaForm = { ...matricula };
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarMatricula(): void {
    if (!this.matriculaForm.alumno.idAlumno) {
      alert('Seleccione un alumno');
      return;
    }
    if (!this.matriculaForm.aula.idAula) {
      alert('Seleccione un aula');
      return;
    }
    if (!this.matriculaForm.anio) {
      alert('Ingrese el año');
      return;
    }
    if (!this.matriculaForm.fecha) {
      alert('Ingrese la fecha');
      return;
    }

    if (!this.editando) {
      const nuevaMatricula: any = {
        idMatricula: null,
        alumno: { idAlumno: this.matriculaForm.alumno.idAlumno },
        aula: { idAula: this.matriculaForm.aula.idAula },
        anio: this.matriculaForm.anio,
        fecha: this.matriculaForm.fecha,
        estado: this.matriculaForm.estado,
      };

      console.log('Enviando nueva matrícula:', nuevaMatricula);

      this.matriculaService.crearMatricula(nuevaMatricula).subscribe({
        next: (data) => {
          alert('Matrícula creada correctamente');
          this.mostrarFormulario = false;
          this.cargarMatriculas();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear la matrícula');
        },
      });
      return;
    }

    if (this.editando && this.matriculaForm.idMatricula) {
      const datosActualizacion: any = {
        idMatricula: this.matriculaForm.idMatricula,
        alumno: { idAlumno: this.matriculaForm.alumno.idAlumno },
        aula: { idAula: this.matriculaForm.aula.idAula },
        anio: this.matriculaForm.anio,
        fecha: this.matriculaForm.fecha,
        estado: this.matriculaForm.estado,
      };

      console.log('Enviando actualización:', datosActualizacion);

      this.matriculaService
        .actualizarMatricula(this.matriculaForm.idMatricula, datosActualizacion)
        .subscribe({
          next: (data) => {
            alert('Matrícula actualizada correctamente');
            this.mostrarFormulario = false;
            this.cargarMatriculas();
          },
          error: (err) => {
            console.error('Error al editar:', err);
            alert(err.error?.message || 'No se pudo actualizar la matrícula');
          },
        });
    }
  }

  eliminarMatricula(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar esta matrícula?');
    if (!confirmar) return;

    this.matriculaService.eliminarMatricula(id).subscribe({
      next: () => {
        alert('Matrícula eliminada correctamente');
        this.cargarMatriculas();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar la matrícula');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.matriculaForm = this.inicializarFormVacio();
  }
}
