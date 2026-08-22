import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AulaService } from '../../services/aula.service';
import { Aula } from '../../models/aula.model';
import { Nivel } from '../../models/nivel.model';
import { Grado } from '../../models/grado.model';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aulas.html',
  styleUrl: './aulas.css',
})
export class Aulas implements OnInit {
  aulas: Aula[] = [];
  cargando: boolean = true;

  mostrarFormulario: boolean = false;
  editando: boolean = false;
  modoVer: boolean = false;

  niveles: Nivel[] = [];
  grados: Grado[] = [];
  profesores: Profesor[] = [];

  aulaForm: Aula = this.inicializarAulaVacia();

  constructor(
    private aulaService: AulaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarAulas();
    this.cargarCatalogos();
  }

  inicializarAulaVacia(): Aula {
    return {
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
    };
  }

  cargarAulas(): void {
    this.cargando = true;
    this.aulaService.obtenerAulas().subscribe({
      next: (data) => {
        this.aulas = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener aulas:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cargarCatalogos(): void {
    this.aulaService.obtenerNiveles().subscribe({
      next: (data) => {
        this.niveles = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener niveles:', err),
    });

    this.aulaService.obtenerGrados().subscribe({
      next: (data) => {
        this.grados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener grados:', err),
    });

    this.aulaService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener profesores:', err),
    });
  }

  abrirCrear(): void {
    this.aulaForm = this.inicializarAulaVacia();
    this.editando = false;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  abrirVer(aula: Aula): void {
    if (!aula.idAula) return;
    this.aulaService.obtenerAulaPorId(aula.idAula).subscribe({
      next: (data) => {
        this.aulaForm = data;
        this.editando = false;
        this.modoVer = true;
        this.mostrarFormulario = true;
      },
      error: (err) => {
        console.error('Error al obtener detalle:', err);
        alert('No se pudo obtener el detalle del aula');
      },
    });
  }

  abrirEditar(aula: Aula): void {
    this.aulaForm = JSON.parse(JSON.stringify(aula));
    this.editando = true;
    this.modoVer = false;
    this.mostrarFormulario = true;
  }

  guardarAula(): void {
    // Validaciones
    if (!this.aulaForm.nivel.idNivel) {
      alert('Seleccione un nivel');
      return;
    }
    if (!this.aulaForm.grado.idGrado) {
      alert('Seleccione un grado');
      return;
    }
    if (!this.aulaForm.seccion.trim()) {
      alert('Ingrese la sección');
      return;
    }
    if (!this.aulaForm.tutor.idProfesor) {
      alert('Seleccione un tutor (profesor)');
      return;
    }

    if (!this.editando) {
      const nuevaAula: any = {
        idAula: null,
        nivel: { idNivel: this.aulaForm.nivel.idNivel },
        grado: { idGrado: this.aulaForm.grado.idGrado },
        seccion: this.aulaForm.seccion,
        capacidad: this.aulaForm.capacidad,
        tutor: { idProfesor: this.aulaForm.tutor.idProfesor },
      };

      console.log('Enviando nueva aula:', nuevaAula);

      this.aulaService.crearAula(nuevaAula).subscribe({
        next: (data) => {
          alert('Aula creada correctamente');
          this.mostrarFormulario = false;
          this.cargarAulas();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert(err.error?.message || 'No se pudo crear el aula');
        },
      });
      return;
    }

    if (this.aulaForm.idAula) {
      console.log('Enviando actualización:', this.aulaForm);
      this.aulaService.actualizarAula(this.aulaForm.idAula, this.aulaForm).subscribe({
        next: (data) => {
          alert('Aula actualizada correctamente');
          this.mostrarFormulario = false;
          this.cargarAulas();
        },
        error: (err) => {
          console.error('Error al editar:', err);
          alert(err.error?.message || 'No se pudo actualizar el aula');
        },
      });
    }
  }

  eliminarAula(id: number): void {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar este aula?');
    if (!confirmar) return;

    this.aulaService.eliminarAula(id).subscribe({
      next: () => {
        alert('Aula eliminada correctamente');
        this.cargarAulas();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.message || 'No se pudo eliminar el aula');
      },
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.modoVer = false;
    this.aulaForm = this.inicializarAulaVacia();
  }
}
