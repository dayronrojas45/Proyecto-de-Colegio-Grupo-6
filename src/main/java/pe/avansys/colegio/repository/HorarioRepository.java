package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.Horario;
import pe.avansys.colegio.model.Horario.Dia;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long > {

    List<Horario> findByProfesorCursoIdProfesorCurso(Long  idProfesorCurso);

    List<Horario> findByAulaIdAula(Long  idAula);

    List<Horario> findByDia(Dia dia);


    @Query("SELECT h FROM Horario h WHERE h.profesorCurso.profesor.idProfesor = :idProfesor")
    List<Horario> findByProfesorId(@Param("idProfesor") Long  idProfesor);


    @Query("SELECT h FROM Horario h WHERE h.aula.idAula = :idAula AND h.dia = :dia " +
            "AND ((h.horaInicio < :horaFin AND h.horaFin > :horaInicio))")
    List<Horario> findConflictsByAulaAndTime(@Param("idAula") Long  idAula,
                                             @Param("dia") Dia dia,
                                             @Param("horaInicio") LocalTime horaInicio,
                                             @Param("horaFin") LocalTime horaFin);


    @Query("SELECT h FROM Horario h WHERE h.profesorCurso.profesor.idProfesor = :idProfesor " +
            "AND h.dia = :dia AND ((h.horaInicio < :horaFin AND h.horaFin > :horaInicio))")
    List<Horario> findConflictsByProfesorAndTime(@Param("idProfesor") Long  idProfesor,
                                                 @Param("dia") Dia dia,
                                                 @Param("horaInicio") LocalTime horaInicio,
                                                 @Param("horaFin") LocalTime horaFin);
}