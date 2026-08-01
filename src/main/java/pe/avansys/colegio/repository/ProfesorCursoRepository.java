package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.ProfesorCurso;

import java.util.List;

@Repository
public interface ProfesorCursoRepository extends JpaRepository<ProfesorCurso, Long  > {

    List<ProfesorCurso> findByProfesorIdProfesor(Long  idProfesor);

    List<ProfesorCurso> findByCursoGradoIdCursoGrado(Long  idCursoGrado);

    boolean existsByProfesorIdProfesorAndCursoGradoIdCursoGrado(Long  idProfesor, Long  idCursoGrado);
}