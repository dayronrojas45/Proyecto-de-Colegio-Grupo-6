package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Buscar usuario por su username para la autenticación
    Optional<Usuario> findByUsername(String username);

    // Verificar si ya existe un username registrado
    Boolean existsByUsername(String username);
}
