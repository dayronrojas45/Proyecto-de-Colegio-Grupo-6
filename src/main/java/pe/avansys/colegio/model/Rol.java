package pe.avansys.colegio.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(name = "nombre", nullable = false, length = 30, unique = true)
    private String nombre;

    @OneToMany(mappedBy = "rol")
    @JsonIgnore
    private List<Usuario> usuarios;
}
