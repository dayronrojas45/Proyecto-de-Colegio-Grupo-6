package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Integer> {
    boolean existsByNombre(String nombre);
}
