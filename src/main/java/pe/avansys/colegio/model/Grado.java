package pe.avansys.colegio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "grado")
public class Grado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grado")
    private Integer idGrado;

    @Column(name = "nombre", nullable = false, length = 30, unique = true)
    private String nombre;
}