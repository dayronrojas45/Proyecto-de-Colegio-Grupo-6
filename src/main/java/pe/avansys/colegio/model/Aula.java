package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aula", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_nivel", "id_grado", "seccion"})
})
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aula")
    private Integer idAula;

    @ManyToOne
    @JoinColumn(name = "id_nivel", nullable = false)
    private Nivel nivel;

    @ManyToOne
    @JoinColumn(name = "id_grado", nullable = false)
    private Grado grado;

    @Column(name = "seccion", nullable = false, length = 1)
    private String seccion;

    @Column(name = "capacidad")
    private Integer capacidad = 30;

    @ManyToOne
    @JoinColumn(name = "id_tutor", nullable = false)
    private Profesor tutor;
}
