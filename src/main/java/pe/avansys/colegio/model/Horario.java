package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "horario")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    @ManyToOne
    @JoinColumn(name = "id_profesor_curso", nullable = false)
    private ProfesorCurso profesorCurso;

    @ManyToOne
    @JoinColumn(name = "id_aula", nullable = false)
    private Aula aula;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia", nullable = false, columnDefinition = "ENUM('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES')")
    private Dia dia;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    public enum Dia {
        LUNES, MARTES, MIERCOLES, JUEVES, VIERNES
    }
}