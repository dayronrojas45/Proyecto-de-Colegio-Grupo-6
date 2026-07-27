package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.Year;

@Data
@Entity
@Table(name = "matricula", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_alumno", "anio"})
})
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Integer idMatricula;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_aula", nullable = false)
    private Aula aula;

    @Column(name = "anio", nullable = false)
    private Year anio;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", columnDefinition = "ENUM('ACTIVO','RETIRADO') DEFAULT 'ACTIVO'")
    private EstadoMatricula estado = EstadoMatricula.ACTIVO;

    public enum EstadoMatricula {
        ACTIVO, RETIRADO
    }
}