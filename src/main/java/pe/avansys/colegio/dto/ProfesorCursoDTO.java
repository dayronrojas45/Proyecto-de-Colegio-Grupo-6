package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class ProfesorCursoDTO {
    private Long  idProfesorCurso;
    private Long  idProfesor;
    private String nombresProfesor;
    private String apellidosProfesor;
    private Long  idCursoGrado;
    private String nombreCurso;
    private String nombreNivel;
    private String nombreGrado;
}
