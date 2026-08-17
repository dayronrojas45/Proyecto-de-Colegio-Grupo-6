package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Matricula;

import java.time.Year;
import java.util.List;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long> {


    List<Matricula> findByAlumno_IdAlumno(Long idAlumno);

    List<Matricula> findByAula_IdAula(Long idAula);

    List<Matricula> findByEstado(Matricula.EstadoMatricula estado);

    boolean existsByAlumnoIdAlumnoAndAnio(Long idAlumno, Integer anio);

    Long countByAulaIdAulaAndAnio(Long idAula, Integer anio);

    @Query("SELECT a.capacidad FROM Aula a WHERE a.idAula = :aulaId")
    Integer obtenerCapacidadAula(@Param("aulaId") Long aulaId);

}
