package pe.avansys.colegio.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class HorarioDTO {
    private Long  idHorario;
    private Long  idProfesorCurso;
    private String nombreProfesor;
    private String nombreCurso;
    private Long  idAula;
    private String seccionAula;
    private String dia;
    private LocalTime horaInicio;
    private LocalTime horaFin;
}