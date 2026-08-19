package pe.avansys.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import pe.avansys.colegio.dto.LoginRequest;
import pe.avansys.colegio.dto.LoginResponse;
import pe.avansys.colegio.dto.ErrorResponse;
import pe.avansys.colegio.model.Usuario;
import pe.avansys.colegio.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"})
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Usuario usuario = usuarioService.obtenerPorUsername(loginRequest.getUsername());

            return ResponseEntity.ok(new LoginResponse(
                    usuario.getIdUsuario(),
                    usuario.getUsername(),
                    usuario.getRol().getNombre(),
                    "Login exitoso"
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Credenciales inválidas: " + e.getMessage()));
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            Usuario usuario = usuarioService.obtenerPorUsername(auth.getName());
            return ResponseEntity.ok(new LoginResponse(
                    usuario.getIdUsuario(),
                    usuario.getUsername(),
                    usuario.getRol().getNombre(),
                    "Usuario autenticado"
            ));
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("No autenticado"));
    }
}