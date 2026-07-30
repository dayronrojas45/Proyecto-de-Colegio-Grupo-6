package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Grado;

@Repository
public interface GradoRepository extends JpaRepository<Grado, Long> {

    // Buscar grado por nombre
    boolean existsByNombre(String nombre);

    // Buscar grado por nombre (para validaciones)
    Grado findByNombre(String nombre);
}