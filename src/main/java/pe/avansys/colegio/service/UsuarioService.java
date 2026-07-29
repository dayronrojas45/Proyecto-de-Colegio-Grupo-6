package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Rol;
import pe.avansys.colegio.model.Usuario;
import pe.avansys.colegio.repository.RolRepository;
import pe.avansys.colegio.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // 1. Encriptar el password con BCrypt
        String passwordCifrado = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordCifrado);

        // 2. Asignar estado activo por defecto
        usuario.setEstado(true);

        // 3. Persistir en MySQL
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
}
