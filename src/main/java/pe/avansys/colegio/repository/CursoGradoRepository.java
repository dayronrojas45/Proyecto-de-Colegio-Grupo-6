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

    @Query("SELECT cg FROM CursoGrado cg WHERE cg.curso.idCurso = :idCurso AND cg.nivel.idNivel = :idNivel AND cg.grado.idGrado = :idGrado")
    CursoGrado findByCursoAndNivelAndGrado(@Param("idCurso") Long idCurso,
                                           @Param("idNivel") Long idNivel,
                                           @Param("idGrado") Long idGrado);
}
