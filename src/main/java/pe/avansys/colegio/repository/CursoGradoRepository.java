package pe.avansys.colegio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.avansys.colegio.model.CursoGrado;

import java.util.List;

@Repository
public interface CursoGradoRepository extends JpaRepository<CursoGrado, Integer> {

    List<CursoGrado> findByCursoIdCurso(Integer idCurso);

    List<CursoGrado> findByNivelIdNivelAndGradoIdGrado(Integer idNivel, Integer idGrado);

    boolean existsByCursoIdCursoAndNivelIdNivelAndGradoIdGrado(Integer idCurso, Integer idNivel, Integer idGrado);

    @Query("SELECT cg FROM CursoGrado cg WHERE cg.curso.idCurso = :idCurso AND cg.nivel.idNivel = :idNivel AND cg.grado.idGrado = :idGrado")
    CursoGrado findByCursoAndNivelAndGrado(@Param("idCurso") Integer idCurso,
                                           @Param("idNivel") Integer idNivel,
                                           @Param("idGrado") Integer idGrado);
}
