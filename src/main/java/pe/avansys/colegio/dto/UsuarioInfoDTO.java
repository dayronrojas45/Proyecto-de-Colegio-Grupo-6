package pe.avansys.colegio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioInfoDTO {
    private Long id;
    private String username;
    private String rol;
    private Boolean estado;
}