package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.avansys.colegio.model.Calificacion;

import java.util.List;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    List<Calificacion> findByAlumnoIdAlumno(Long idAlumno);

    List<Calificacion> findByProfesorCursoIdProfesorCurso(Long idProfesorCurso);

    List<Calificacion> findByAlumnoIdAlumnoAndBimestre(
            Long idAlumno,
            Integer bimestre
    );
}
