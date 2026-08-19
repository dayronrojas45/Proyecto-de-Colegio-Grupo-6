package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.CursoGrado;

import java.util.List;

@Repository
public interface CursoGradoRepository extends JpaRepository<CursoGrado, Long > {

    List<CursoGrado> findByCursoIdCurso(Long idCurso);

    List<CursoGrado> findByNivelIdNivelAndGradoIdGrado(Long idNivel, Long idGrado);

    boolean existsByCursoIdCursoAndNivelIdNivelAndGradoIdGrado(Long idCurso, Long idNivel, Long idGrado);
}
