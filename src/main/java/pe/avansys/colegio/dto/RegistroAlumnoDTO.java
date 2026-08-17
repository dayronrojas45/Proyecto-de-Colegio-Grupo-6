package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class RegistroAlumnoDTO {
    private String username;
    private String password;
    private String dni;
    private String nombres;
    private String apellidos;
    private String fechaNacimiento;
    private String sexo;
    private String direccion;
    private String correo;
    private String telefono;
}