package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.avansys.colegio.model.Aula;

import java.util.List;

public interface AulaRepository extends JpaRepository<Aula, Long> {

    List<Aula> findByGrado(String nombre);
}
