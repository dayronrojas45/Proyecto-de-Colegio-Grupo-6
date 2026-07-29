package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Matricula;

import java.time.Year;
import java.util.List;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {


    List<Matricula> findByAlumno_IdAlumno(Integer idAlumno);

    List<Matricula> findByAula_IdAula(Integer idAula);

    List<Matricula> findByEstado(Matricula.EstadoMatricula estado);

    boolean existsByAlumno_IdAlumnoAndAnio(Integer idAlumno, Year anio);
}
