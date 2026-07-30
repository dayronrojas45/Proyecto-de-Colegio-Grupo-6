package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Long idCurso;

    @Column(name = "nombre")
    private String nombre;
}