package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class RegistroProfesorDTO {
    private String username;
    private String password;
    private String dni;
    private String nombres;
    private String apellidos;
    private String correo;
    private String telefono;
    private String especialidad;
}