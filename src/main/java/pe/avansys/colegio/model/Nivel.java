package pe.avansys.colegio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "nivel")
public class Nivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nivel")
    private Long idNivel;

    @Column(name = "nombre", nullable = false, length = 20, unique = true)
    private String nombre;

    @OneToMany(mappedBy = "nivel")
    @JsonIgnore
    private List<Aula> aulas;
}