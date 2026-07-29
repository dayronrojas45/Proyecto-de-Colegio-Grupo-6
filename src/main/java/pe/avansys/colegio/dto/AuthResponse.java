package pe.avansys.colegio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String username;
    private String rol;
    private String mensaje;
    private boolean exito;
}