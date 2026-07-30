package pe.avansys.colegio.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import pe.avansys.colegio.model.Alumno;

import java.util.List;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    List<Alumno> findByNombres(String nombres);
}
