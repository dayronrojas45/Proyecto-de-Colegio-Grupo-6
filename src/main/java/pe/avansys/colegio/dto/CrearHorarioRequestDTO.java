package pe.avansys.colegio.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CrearHorarioRequestDTO {
    private Long  idProfesorCurso;
    private Long  idAula;
    private String dia;
    private LocalTime horaInicio;
    private LocalTime horaFin;
}