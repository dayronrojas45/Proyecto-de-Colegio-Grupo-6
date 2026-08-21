package pe.avansys.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Usuario;
import pe.avansys.colegio.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"}, allowCredentials = "true")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario){
        Usuario guardado = usuarioService.registrar(usuario);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario){
        return usuarioService.buscarPorId(id)
                .map(existingUser -> {
                    // Actualizamos solo los campos que nos interesan
                    existingUser.setUsername(usuario.getUsername());
                    existingUser.setEstado(usuario.getEstado());
                    existingUser.setRol(usuario.getRol());

                    // Solo actualizamos la contraseña si viene algo en el JSON
                    if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
                        existingUser.setPassword(usuario.getPassword());
                    }

                    Usuario actualizado = usuarioService.actualizarUsuarioSimple(existingUser);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔥 CORREGIDO: Delete con manejo de errores (Desactiva si falla el borrado físico)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuarioService.buscarPorId(id).isPresent()) {
            try {
                // 1. Intenta borrar físicamente
                usuarioService.eliminarUsuario(id);
                return ResponseEntity.noContent().build();
            } catch (Exception e) {
                // 2. Si falla por llaves foráneas (asistencia/calificación), lo desactiva
                usuarioService.desactivarUsuario(id);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
}