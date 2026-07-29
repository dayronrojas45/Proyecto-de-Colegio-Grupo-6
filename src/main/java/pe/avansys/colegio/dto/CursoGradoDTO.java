package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class CursoGradoDTO {
    private Integer idCursoGrado;
    private Integer idCurso;
    private String nombreCurso;
    private Integer idNivel;
    private String nombreNivel;
    private Integer idGrado;
    private String nombreGrado;
    private Integer horasSemanales;
}