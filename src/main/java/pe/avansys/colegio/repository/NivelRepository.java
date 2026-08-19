package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Nivel;

@Repository
public interface NivelRepository extends JpaRepository<Nivel, Long> {

}