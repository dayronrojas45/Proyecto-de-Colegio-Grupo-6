package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "curso_grado", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_curso", "id_nivel", "id_grado"})
})
public class CursoGrado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso_grado")
    private Integer idCursoGrado;

    @ManyToOne
    @JoinColumn(name = "id_curso", nullable = false)
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "id_nivel", nullable = false)
    private Nivel nivel;

    @ManyToOne
    @JoinColumn(name = "id_grado", nullable = false)
    private Grado grado;

    @Column(name = "horas_semanales")
    private Integer horasSemanales;
}