package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Asistencia;

import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Integer> {

    List<Asistencia> findByAlumnoIdAlumno(Integer idAlumno);

    List<Asistencia> findByHorarioIdHorarioAndFecha(Integer idHorario, java.time.LocalDate fecha);

}