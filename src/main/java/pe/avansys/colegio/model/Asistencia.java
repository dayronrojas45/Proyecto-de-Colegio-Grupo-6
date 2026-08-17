package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "asistencia", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_alumno", "id_horario", "fecha"})
})
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asistencia")
    private Long idAsistencia;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_horario", nullable = false)
    private Horario horario;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, columnDefinition = "ENUM('PRESENTE','AUSENTE','TARDANZA','JUSTIFICADO')")
    private EstadoAsistencia estado;

    public enum EstadoAsistencia {
        PRESENTE, AUSENTE, TARDANZA, JUSTIFICADO
    }
}