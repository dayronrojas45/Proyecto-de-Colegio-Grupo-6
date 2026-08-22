package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Asistencia;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    List<Asistencia> findByAlumnoIdAlumno(Long idAlumno);

    List<Asistencia> findByHorarioAulaIdAula(Long idAula);

    Optional<Asistencia> findByAlumnoIdAlumnoAndHorarioIdHorarioAndFecha(
            Long idAlumno, Long idHorario, LocalDate fecha
    );

    List<Asistencia> findByHorarioAulaIdAulaAndHorarioIdHorarioAndFecha(
            Long idAula, Long idHorario, LocalDate fecha
    );
}