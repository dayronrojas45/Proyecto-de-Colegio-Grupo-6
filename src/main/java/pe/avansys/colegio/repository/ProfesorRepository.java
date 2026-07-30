package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.avansys.colegio.model.Profesor;

import java.util.List;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

    List<Profesor> findByNombres(String nombres);
}
