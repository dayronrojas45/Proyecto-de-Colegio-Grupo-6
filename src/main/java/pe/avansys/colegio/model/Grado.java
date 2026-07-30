package pe.avansys.colegio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "grado")
public class Grado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grado")
    private Long idGrado;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "grado")
    @JsonIgnore
    private List<Aula> aulas;
}