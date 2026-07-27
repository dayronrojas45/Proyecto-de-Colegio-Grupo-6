package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profesor_curso", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_profesor", "id_curso_grado"})
})
public class ProfesorCurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_profesor_curso")
    private Integer idProfesorCurso;

    @ManyToOne
    @JoinColumn(name = "id_profesor", nullable = false)
    private Profesor profesor;

    @ManyToOne
    @JoinColumn(name = "id_curso_grado", nullable = false)
    private CursoGrado cursoGrado;
}