package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class CursoGradoDTO {
    private Long idCursoGrado;
    private Long idCurso;
    private String nombreCurso;
    private Long idNivel;
    private String nombreNivel;
    private Long idGrado;
    private String nombreGrado;
    private Integer horasSemanales;
}