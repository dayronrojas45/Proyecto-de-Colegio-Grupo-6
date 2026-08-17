package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "calificacion", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_alumno", "id_profesor_curso", "bimestre"})
})
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_calificacion")
    private Long idCalificacion;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_profesor_curso", nullable = false)
    private ProfesorCurso profesorCurso;

    @Column(name = "bimestre", nullable = false)
    private Integer bimestre;

    @Column(name = "pc1", precision = 4, scale = 2)
    private BigDecimal pc1;

    @Column(name = "pc2", precision = 4, scale = 2)
    private BigDecimal pc2;

    @Column(name = "examen_final", precision = 4, scale = 2)
    private BigDecimal examenFinal;

    @Column(name = "promedio", precision = 4, scale = 2)
    private BigDecimal promedio;
}