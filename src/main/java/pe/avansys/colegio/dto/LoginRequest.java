package pe.avansys.colegio.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}