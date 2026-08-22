import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { HorarioDTO, CrearHorarioRequestDTO } from '../../models/horario.model';
import { ProfesorCursoDTO } from '../../models/profesor-curso.model';
import { Aula } from '../../models/aula.model';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario.html',
  styleUrl: './horario.css',
})
export class Horario implements OnInit {
  horarios: HorarioDTO[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  profesoresCursos: ProfesorCursoDTO[] = [];
  aulas: Aula[] = [];

  dias: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

  horarioForm: CrearHorarioRequestDTO = this.inicializarFormVacio();
  idHorarioEditando: number = 0;

  constructor(
    private horarioService: HorarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarHorarios();
    this.cargarCatalogos();
  }

  inicializarFormVacio(): CrearHorarioRequestDTO {
    return {
      idProfesorCurso: 0,
      idAula: 0,
      dia: 'LUNES',
      horaInicio: '08:00',
      horaFin: '09:00',
    };
  }

  cargarHorarios(): void {
    this.cargando = true;
    this.horarioService.obtenerHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener horarios:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarCatalogos(): void {
    this.horarioService.obtenerProfesoresCursos().subscribe({
      next: (data) => {
        this.profesoresCursos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener profesores-cursos:', err),
    });

    this.horarioService.obtenerAulas().subscribe({
      next: (data) => {
        this.aulas = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener aulas:', err),
    });
  }

  abrirCrear(): void {
    this.horarioForm = this.inicializarFormVacio();
    this.editando = false;
    this.modoVer = false;
    this.idHorarioEditando = 0;
    this.mostrarFormulario = true;
  }

  abrirVer(horario: HorarioDTO): void {
    this.horarioForm = {
      idProfesorCurso: horario.idProfesorCurso,
      idAula: horario.idAula,
      dia: horario.dia,
      horaInicio: horario.horaInicio,
      horaFin: horario.horaFin,
    };
    this.idHorarioEditando = horario.idHorario;
    this.editando = false;
    this.modoVer = true;
    this.mostrarFormulario = true;
  }

  abrirEditar(horario: HorarioDTO): void {
    this.horarioForm = {
      idProfesorCurso: horario.idProfesorCurso,
      idAula: horario.idAula,
      dia: horario.dia,
      horaInicio: horario.horaInicio,
      horaFin: horario.horaFin,
    };
    this.idHorarioEditando = horario.idHorario;
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarHorario(): void {
    if (!this.horarioForm.idProfesorCurso) {
      alert('Seleccione un profesor-curso');
      return;
    }
    if (!this.horarioForm.idAula) {
      alert('Seleccione un aula');
      return;
    }

    if (!this.editando) {
      console.log('Enviando nuevo horario:', this.horarioForm);

      this.horarioService.crearHorario(this.horarioForm).subscribe({
        next: (data) => {
          alert('Horario creado correctamente');
          this.mostrarFormulario = false;
          this.cargarHorarios();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el horario');
        },
      });
      return;
    }


    if (this.editando && this.idHorarioEditando > 0) {
      console.log('Enviando actualización:', this.horarioForm);

      this.horarioService.actualizarHorario(this.idHorarioEditando, this.horarioForm).subscribe({
        next: (data) => {
          alert('Horario actualizado correctamente');
          this.mostrarFormulario = false;
          this.cargarHorarios();
        },
        error: (err) => {
          console.error('Error al editar:', err);
          alert(err.error?.message || 'No se pudo actualizar el horario');
        },
      });
    }
  }

  eliminarHorario(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este horario?');
    if (!confirmar) return;

    this.horarioService.eliminarHorario(id).subscribe({
      next: () => {
        alert('Horario eliminado correctamente');
        this.cargarHorarios();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar el horario');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.idHorarioEditando = 0;
    this.horarioForm = this.inicializarFormVacio();
  }
}
